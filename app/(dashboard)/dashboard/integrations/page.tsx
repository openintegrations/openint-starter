import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

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

      console.log("resources", resources);

      const balanceSheet = await openint
        .GET("/unified/accounting/balance-sheet")
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching balance sheet:", err);
          return null;
        });

      return {
        token,
        balanceSheet,
        profitAndLoss,
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

  const { token, balanceSheet, profitAndLoss } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Integrations
      </h1>

      <Embed
        clientToken={token}
        balanceSheet={balanceSheet}
        profitAndLoss={profitAndLoss}
      />
    </section>
  );
}
