import { getUser } from "@/lib/db/queries";

import { Embed } from "./embed";

type ActionState = {
  error?: string;
  success?: string;
};

export default async function IntegrationsPage() {
  const fetchToken = async () => {
    try {
      const response = await fetch("https://openint.dev/api/v0/connect/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-apikey":
            "b3JnXzJtbG9Sd0xsdWNGODRFWlBvZUM2Smw5OTNuUTprZXlfMDFKOTBNWE5RUU41RTA4OVpUUVc1RkVWRTY=",
        },
        body: JSON.stringify({
          endUserId: "xxx", // TODO: make dynamic
          validityInSeconds: 2592000,
        }),
      });

      if (!response.ok) {
        console.error(response.body);
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      return data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      return null;
    }
  };

  const clientToken = await fetchToken();

  if (!clientToken) {
    return <div>Failed to fetch token</div>;
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Integrations
      </h1>

      <Embed clientToken={clientToken} />
    </section>
  );
}
