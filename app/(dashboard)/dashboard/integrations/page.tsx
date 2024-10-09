import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";
import { google } from "googleapis";

export default async function IntegrationsPage() {
  const fetchServerData = async () => {
    try {
      const openint = initOpenIntSDK({
        headers: {
          "x-apikey":
            "b3JnXzJuOEVhV1ZMN2FFdWN0dTBhSXZ0WDNCNHJsSDprZXlfMDFKOU4wWlREQlYxVjRNVlRTSzZIRzM4S1Y=",
        },
      });

      const tokenResponse = await openint
        .POST("/connect/token", {
          body: {
            endUserId: "xxx",
            validityInSeconds: 2592000,
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching token:", err);
          return null;
        });

      const token = tokenResponse ? tokenResponse.token : null;

      const resources = await openint.GET("/core/resource").then((r) => r.data);

      // search for google drive
      // then get credentials
      // then list files

      const resource = resources.find(
        (r: any) => r.connectorName === "google" // tbd
      );

      console.log("google drive resource", JSON.stringify(resource, null, 2));
      // // Create an OAuth2 client and set credentials
      const oAuth2Client = new google.auth.OAuth2();

      oAuth2Client.setCredentials({
        // @ts-ignore
        access_token: resource?.settings?.oauth?.credentials?.raw?.access_token,
        // refresh_token:
        //   // @ts-ignore
        //   resource?.settings?.oauth?.credentials?.raw?.refresh_token,
      });

      const drive = google.drive({ version: "v3", auth: oAuth2Client });

      const response = await drive.files.list({
        pageSize: 20, // Adjust the number of files to list
        fields: "files(id, name, mimeType, size, webViewLink)", // Specify the fields to retrieve
      });

      return {
        token,
        files: response.data.files,
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      return {
        token: null,
        balanceSheet: null,
        profitAndLoss: null,
      };
    }
  };

  const { token, files } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Integrations
      </h1>

      <Embed clientToken={token} files={files} />
    </section>
  );
}
