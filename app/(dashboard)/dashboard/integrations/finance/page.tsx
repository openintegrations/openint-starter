import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const fetchServerData = async () => {
    try {
      const openint = initOpenIntSDK({
        headers: {
          "x-apikey": process.env.OPENINT_API_KEY ?? "",
        },
      });

      const tokenResponse = await openint
        .POST("/connect/token", {
          body: {
            customerId: "xxx",
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching token:", err);
          return null;
        });

      const token = tokenResponse?.token ?? "";

      const [balanceSheet, profitAndLoss] = await Promise.all([
        openint
          .GET("/unified/accounting/balance-sheet", {
            headers: {
              "x-connection-connector-name": "qbo",
            },
            params: {
              query: {
                start_date: "2024-01-01",
                end_date: "2024-01-31",
              },
            },
          })
          .then((r) => r.data)
          .catch((err) => {
            console.error("Error fetching balance sheet:", err);
            return null;
          }),

        openint
          .GET("/unified/accounting/profit-and-loss", {
            headers: {
              "x-connection-connector-name": "qbo",
            },
            params: {
              query: { date_macro: "Today" },
            },
          })
          .then((r) => r.data)
          .catch((err) => {
            console.error("Error fetching profit and loss:", err);
            return null;
          }),
      ]);

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
        cashFlow: null,
        transactionList: null,
        customerBalance: null,
        customerIncome: null,
        accounts: null,
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
