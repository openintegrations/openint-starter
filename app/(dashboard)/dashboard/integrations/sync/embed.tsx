"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OpenIntConnectEmbed, OpenIntFrontend } from "@openint/connect";
import React from "react";

export function Embed({ clientToken }: { clientToken: string }) {
  // example for listening to events
  setTimeout(() => {
    OpenIntFrontend.listen((notification: any) => {
      if (notification.event.name === "connect/connection-connected") {
        console.log("OpenInt Connection Added");
        window.location.reload();
      }
    });
  }, 1000);

  return (
    <>
      <Card style={{ height: "700px" }}>
        <CardContent>
          <OpenIntConnectEmbed
            width={800}
            height={700}
            params={{ token: clientToken }}
            baseUrl="https://openint-git-starbasedb-openint-dev.vercel.app"
          />
        </CardContent>
      </Card>
    </>
  );
}
