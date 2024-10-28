import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const fetchServerData = async () => {
    try {
      const openint = initOpenIntSDK({
        // baseUrl: "http://localhost:4000/api/v0",
        headers: {
          "x-apikey": "x-api-key-goes-here",
          "x-resource-connector-name": "qbo",
        },
      });

      const tokenResponse = await openint
        .POST("/connect/token", {
          body: {
            endUserId: "xxx",
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching token:", err);
          return null;
        });

      const token = tokenResponse?.token;

      console.log("token", token);

      const resources = await openint.GET("/core/resource").then((r) => r.data);

      console.log("resources", resources);

      const balanceSheet = await openint
        .GET("/unified/accounting/balance-sheet", {
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
        });

      const profitAndLoss = await openint
        .GET("/unified/accounting/profit-and-loss", {
          params: {
            query: { date_macro: "Today" },
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching profit and loss:", err);
          return null;
        });

      const cashFlow = await openint
        .GET("/unified/accounting/cash-flow", {
          params: {
            query: {
              date_macro: "Today",
              sort_order: "desc",
            },
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching cash flow:", err);
          return null;
        });

      const transactionList = await openint
        .GET("/unified/accounting/transaction-list")
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching transaction list:", err);
          return null;
        });

      const customerBalance = await openint
        .GET("/unified/accounting/customer-balance", {
          params: {
            query: {
              customer: "1",
            },
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching customer balance:", err);
          return null;
        });

      const customerList = await openint
        .request(
          "GET",
          "https://quickbooks.api.intuit.com/v3/company/{realmId}/customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching customer list:", err);
          return null;
        });

      const customerIncome = await openint
        .GET("/unified/accounting/customer-income", {
          params: {
            query: {
              customer: "1",
            },
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching customer income:", err);
          return null;
        });

      const accounts = await openint
        .GET("/unified/accounting/account")
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching accounts:", err);
          return null;
        });

      const bankAccounts = await openint
        .GET("/unified/accounting/bank-accounts", {
          params: {
            query: {
              customer: "1",
            },
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching bank accounts:", err);
          return null;
        });

      const receipt = await openint.GET("/unified/accounting/payment-receipt", {
        params: {
          query: {
            customer_transaction_id: "1",
          },
        },
      });

      console.log(
        JSON.stringify({
          token,
          balanceSheet,
          profitAndLoss,
          cashFlow,
          transactionList,
          customerBalance,
          customerIncome,
          accounts,
          customerList,
          bankAccounts,
          receipt,
        })
      );

      return {
        token,
        balanceSheet,
        profitAndLoss,
        cashFlow,
        transactionList,
        customerBalance,
        customerIncome,
        accounts,
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

  const {
    token,
    balanceSheet,
    profitAndLoss,
    cashFlow,
    transactionList,
    customerBalance,
    customerIncome,
    accounts,
  } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Integrations
      </h1>

      <Embed
        clientToken={token}
        balanceSheet={balanceSheet}
        profitAndLoss={profitAndLoss}
        cashFlow={cashFlow}
        transactionList={transactionList}
        customerBalance={customerBalance}
        customerIncome={customerIncome}
        accounts={accounts}
      />
    </section>
  );
}
