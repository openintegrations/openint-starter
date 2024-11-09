"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";
import React from "react";

export function Embed({ clientToken }: { clientToken: string }) {
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
    </>
  );
}
