"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OpenIntConnectEmbed, OpenIntFrontend } from "@openint/connect";
import React from "react";

export function Embed({
  clientToken,
  connections,
}: {
  clientToken: string;
  connections: any;
}) {
  console.log(clientToken, connections);
  OpenIntFrontend.listen((event: any) => {
    console.log("oint event", event);
  });

  /* 
      You can pass the access token to third party APIs using their official SDKs or directly:

      Example using curl:
      curl --header "Authorization: Bearer {connection.settings.oauth.access_token}" \
        https://api.hubapi.com/crm/v3/objects/contacts?limit=10&archived=false

      Example using HubSpot SDK:
      const hubspot = require('@hubspot/api-client')
      const hubspotClient = new hubspot.Client({
        accessToken: {connection.settings.oauth.access_token}
      })
    */

  return (
    <>
      <Card style={{ height: "700px" }}>
        <CardContent>
          <OpenIntConnectEmbed
            width={800}
            height={700}
            params={{ token: clientToken }}
          />
        </CardContent>
      </Card>
      {connections
        .filter((c: any) => !!c.settings?.oauth?.expires_at)
        .map((connection: any) => (
          <Card key={connection.id}>
            <CardContent>
              <h3 className="font-medium mb-2">
                {connection.connectorName.trim(0).toUpperCase() +
                  connection.connectorName.slice(1)}
              </h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Property</th>
                    <th className="text-left py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Connection Id</td>
                    <td className="py-2 font-mono text-sm break-all">
                      {connection.id || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Client Id</td>
                    <td className="py-2 font-mono text-sm break-all">
                      {connection.settings.client_id || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Access Token</td>
                    <td className="py-2 font-mono text-sm break-all">
                      {connection.settings.oauth.access_token || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Expires At</td>
                    <td className="py-2">
                      {connection.settings.oauth.expires_at || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
