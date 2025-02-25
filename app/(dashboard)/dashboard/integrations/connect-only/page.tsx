import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const openint = initOpenIntSDK({
    apiKey: process.env.OPENINT_API_KEY ?? "",
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

  const connections = await openint.GET("/connect/connections");
  const token = tokenResponse?.data?.token ?? "";

  console.log("token", token);
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Basic Sync Integration
      </h1>
      <Embed clientToken={token} connections={connections} />
    </section>
  );
}
