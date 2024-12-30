"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OpenIntConnectEmbed, OpenIntFrontend } from "@openint/connect";
import React from "react";

export function Embed({ clientToken }: { clientToken: string }) {
  // example for listening to events
  setTimeout(() => {
    OpenIntFrontend.listen((event: any) => {
      console.log("oint event", event);
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
            // baseUrl="http://localhost:4000"
          />
        </CardContent>
      </Card>
    </>
  );
}
