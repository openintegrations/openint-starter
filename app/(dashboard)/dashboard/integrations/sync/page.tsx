import { Embed } from "./embed";
import { initOpenIntSDK } from "@opensdks/sdk-openint";

export default async function IntegrationsPage() {
  const openint = initOpenIntSDK({
    headers: { "x-apikey": process.env.OPENINT_API_KEY ?? "" },
  });

  const tokenResponse = await openint
    .POST("/connect/token", {
      body: { endUserId: "END_USER_ID" },
    })
    .catch((err) => {
      console.error("Error fetching token:", err);
      return { data: { token: null } };
    });

  const token = tokenResponse?.data?.token ?? "";

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Basic Sync Integration
      </h1>
      <Embed clientToken={token} />
    </section>
  );
}
