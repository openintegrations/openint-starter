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
            customerId: "END_USER_ID",
          },
        })
        .then((r) => r.data)
        .catch((err) => {
          console.error("Error fetching token:", err);
          return null;
        });

      const token = tokenResponse?.token ?? "";

      const connectionsResponse = await fetch(
        "https://openint.dev/api/v0/core/connection?forceRefresh=true",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!connectionsResponse.ok) {
        console.error(await connectionsResponse.text());
        throw new Error("Failed to fetch connections");
      }

      const connections = await connectionsResponse.json();

      const connection = connections.find(
        (r: any) => r.connectorName === "hubspot"
      );

      if (!connection) {
        console.warn("No hubspot connection found ");
        return {
          token,
        };
      }

      const fetchUnifiedData = async (path: string) => {
        return openint
          .GET(path, {
            headers: {
              "x-connection-id": connection?.id,
            },
          })
          .then((r) => r.data)
          .catch((err) => {
            console.error(`Error fetching data from ${path}:`, err);
            return null;
          });
      };

      const [accounts, contacts] = await Promise.all([
        fetchUnifiedData("/unified/crm/account"),
        fetchUnifiedData("/unified/crm/contact"),
      ]);

      return {
        token,
        accounts,
        contacts,
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      return {
        token: null,
        accounts: null,
        contacts: null,
      };
    }
  };

  const { token, accounts, contacts } = await fetchServerData();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Sales Integrations
      </h1>

      <Embed
        clientToken={token}
        accounts={accounts as any[]}
        contacts={contacts as any[]}
      />
    </section>
  );
}
