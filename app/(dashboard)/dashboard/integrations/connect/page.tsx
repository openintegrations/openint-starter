import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const openint = initOpenIntSDK({
    auth: {
      openInt: {
        apiKey: process.env.OPENINT_API_KEY ?? "",
      },
    },
    headers: {
      "x-connection-customer-id": "END_USER_ID",
    },
    // baseUrl: "http://localhost:4000/api/v0",
  });

  const tokenResponse = await openint
    .POST("/connect/token", {
      body: { customerId: "END_USER_ID" },
    })
    .catch((err) => {
      console.error("Error fetching token:", err);
      return { data: { token: null } };
    });

  const { data: connections } = await openint.GET("/core/connection");
  const token = tokenResponse?.data?.token ?? "";

  console.log("token", token);
  console.log("connections", connections);
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Basic Sync Integration
      </h1>
      <Embed clientToken={token} connections={connections} />
    </section>
  );
}
