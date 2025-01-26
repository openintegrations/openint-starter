import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const customerId = "zzz";
  const fetchServerData = async () => {
    try {
      const openint = initOpenIntSDK({
        baseUrl: "http://localhost:4000/api/v0",
        apiKey: process.env.OPENINT_API_KEY ?? "",
      });

      const magicLinkResponse = await openint
        .POST("/connect/magic-link", {
          body: { customerId, validityInSeconds: 2592000 },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error generating magic link:", err);
          return null;
        });

      const magicLink = magicLinkResponse?.url;

      const connectionsResponse = await openint
        .GET("/core/connection", {
          params: {
            query: {
              customerId,
              connectorName: "microsoft",
            },
          },
        })
        .then((r) => r.data);

      if (connectionsResponse?.length > 0) {
        const connectionId = connectionsResponse[0].id;

        const files = await openint
          .GET("/unified/file-storage/file", {
            headers: {
              "x-connection-id": connectionId,
            },
          })
          .then((r) => r.data);

        const filePickerLinkResponse = await openint
          .POST("/connect/file-picker", {
            body: {
              connectionId,
            },
            headers: {
              "x-connection-id": connectionId,
            },
          })
          .then((r) => r.data);

        return {
          filePickerLink: filePickerLinkResponse?.url,
          embedConnectLink: magicLink,
          files: files.items,
        };
      }
      return {
        filePickerLink: null,
        embedConnectLink: magicLink,
        files: [],
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      return {
        filePickerLink: null,
        embedConnectLink: null,
        files: [],
      };
    }
  };

  const { embedConnectLink, filePickerLink, files } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        File Integrations
      </h1>

      <Embed
        embedConnectLink={embedConnectLink ?? ""}
        filePickerLink={filePickerLink ?? ""}
        files={files}
      />
    </section>
  );
}
