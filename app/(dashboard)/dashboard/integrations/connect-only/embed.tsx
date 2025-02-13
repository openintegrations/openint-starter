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
  {
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
  }
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
      {connections.map((connection: any) => (
        <Card key={connection.id}>
          <CardContent>{connection.name}</CardContent>
          <CardContent>
            Access Token{" "}
            {connection.settings.oauth.access_token
              ? `${connection.settings.oauth.access_token.slice(
                  0,
                  6
                )}...xxx...${connection.settings.oauth.access_token.slice(-6)}`
              : ""}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
