import { Embed } from "./embed.google";
import { initOpenIntSDK } from "@opensdks/sdk-openint";
import { google } from "googleapis";

export default async function IntegrationsPage() {
  const fetchServerData = async () => {
    try {
      // const openint = initOpenIntSDK({
      //   baseURL: "https://openint.dev/api/v0",
      //   headers: {
      //     "x-apikey":
      //       "b3JnXzJuOEVhV1ZMN2FFdWN0dTBhSXZ0WDNCNHJsSDprZXlfMDFKOU4wWlREQlYxVjRNVlRTSzZIRzM4S1Y=",
      //   },
      // });

      // const tokenResponse = await openint
      //   .POST("/connect/token", {
      //     body: {
      //       endUserId: "xxx",
      //     },
      //   })
      //   .then((r) => r.data)
      //   .catch((err) => {
      //     console.error("Error fetching token:", err);
      //     return null;
      //   });

      // const token = tokenResponse?.token;
      // Fetch token
      const tokenResponse = await fetch(
        "https://openint.dev/api/v0/connect/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey":
              "b3JnXzJuOEVhV1ZMN2FFdWN0dTBhSXZ0WDNCNHJsSDprZXlfMDFKOU4wWlREQlYxVjRNVlRTSzZIRzM4S1Y=",
          },
          body: JSON.stringify({
            endUserId: "xxx", // TODO: make dynamic
            validityInSeconds: 2592000,
          }),
        }
      );

      if (!tokenResponse.ok) {
        console.error(await tokenResponse.text());
        throw new Error("Failed to fetch token");
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.token;

      console.log("token", token);

      const resourcesResponse = await fetch(
        "https://openint.dev/api/v0/core/resource?forceRefresh=true",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resourcesResponse.ok) {
        console.error(await resourcesResponse.text());
        throw new Error("Failed to fetch resources");
      }

      const resources = await resourcesResponse.json();

      console.log("resources", JSON.stringify(resources, null, 2));
      // search for google drive
      // then get credentials
      // then list files

      // const resourcesResponse = await openint
      //   // @ts-ignore
      //   .GET("/core/resource?forceRefresh=true", {
      //     baseURL: "https://openint.dev/api/v0",
      //     headers: {
      //       // TODO: discuss with tony
      //       Authorization: `Bearer ${token}`,
      //       // "x-apikey":
      //       //   "b3JnXzJuOEVhV1ZMN2FFdWN0dTBhSXZ0WDNCNHJsSDprZXlfMDFKOU4wWlREQlYxVjRNVlRTSzZIRzM4S1Y=",
      //     },
      //   })
      //   .then((r) => r.data);

      const resource = resources.find(
        (r: any) => r.connectorName === "google" // tbd
      );

      if (!resource) {
        console.error("No google drive resource found");
        return {
          token,
          files: [],
        };
      }

      console.log("google drive resource", JSON.stringify(resource, null, 2));

      return {
        token,
        files: [],
      };
      // // Create an OAuth2 client and set credentials
      const oAuth2Client = new google.auth.OAuth2();

      oAuth2Client.setCredentials({
        // @ts-ignore
        access_token: resource?.settings?.oauth?.credentials?.raw?.access_token,
        // refresh_token:
        //   // @ts-ignore
        //   resource?.settings?.oauth?.credentials?.raw?.refresh_token,
      });

      // AMADEO NOTE: this is not working at the proxy level as its failing auth with clerk https://gist.github.com/pellicceama/7100ad9d9207a353d60a691bfc8ff787
      // const drive = google.drive({
      //   version: "v3",
      //   // proxy: "https://openint.dev/api/proxy/",
      //   baseURL: "https://openint.dev/api/proxy",
      //   adapter: async (options, defaultAdapter) => {
      //     // Modify the URL to remove unwanted parts
      //     if (options.url) {
      //       const url = new URL(options.url, options.baseURL);
      //       // Remove unwanted parts from the URL
      //       url.pathname = url.pathname.replace(
      //         "https://www.googleapis.com",
      //         ""
      //       );
      //       options.url = url.toString();
      //     }
      //     // Call the default adapter with the modified options
      //     return defaultAdapter(options);
      //   },
      //   headers: {
      //     "x-apikey":
      //       "b3JnXzJuOEVhV1ZMN2FFdWN0dTBhSXZ0WDNCNHJsSDprZXlfMDFKOU4wWlREQlYxVjRNVlRTSzZIRzM4S1Y=",
      //     "x-resource-id": resource.id, // "reso_google_01J9SBP5J673CV9XK46ZVCF42K",
      //   },
      // });

      const drive = google.drive({ version: "v3", auth: oAuth2Client });

      const response = await drive.files.list({
        pageSize: 20, // Adjust the number of files to list
        fields: "files(id, name, mimeType, size, webViewLink)", // Specify the fields to retrieve
      });

      console.log("response", JSON.stringify(response, null, 2));
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
