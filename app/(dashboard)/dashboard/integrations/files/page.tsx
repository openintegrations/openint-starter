import { google } from "googleapis";
import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const fetchServerData = async () => {
    try {
      const openint = initOpenIntSDK({
        baseUrl: "http://localhost:4000/api/v0",
        headers: {
          "x-apikey": process.env.OPENINT_API_KEY ?? "",
        },
      });
      
      const magicLinkResponse = await openint
        .POST("/connect/magic-link", {
          body: { endUserId: "END_USER_ID", validityInSeconds: 2592000 },
        })
        .then((r) => r.data);

      const link = magicLinkResponse.url;

      console.log("Magic link generated", link);

      const resourcesResponse = await openint
        .GET("/core/resource", {
          params: {query: {
            forceRefresh: true,
            },
          },
        })
        .then((r) => r.data);

      console.log(resourcesResponse);

      // TODO: 
      

      return {
        link,
        files: [],
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      return {
        link: null,
        files: []
      };
    }
  };

  const { link, files } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        File Integrations
      </h1>

      <Embed link={link} files={files} />
    </section>
  );
}
