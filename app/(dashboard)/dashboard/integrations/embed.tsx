"use client";

import { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/auth";
import { updateAccount } from "@/app/(login)/actions";
import { OpenIntFrontend, OpenIntConnectEmbed } from "@openint/connect";

type ActionState = {
  error?: string;
  success?: string;
};

export function Embed({ clientToken }: { clientToken: string }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Connect Iframe</CardTitle>
        </CardHeader>
        <CardContent>
          <p> embedded content</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="button"
            onClick={() => {
              OpenIntFrontend.openMagicLink({
                url: `https://openint.dev/connect?showExisting=true&token=${clientToken}`,
              });
            }}
          >
            Iframe load
          </button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Connect React</CardTitle>
        </CardHeader>
        <CardContent>
          <OpenIntConnectEmbed
            width={800}
            height={500}
            // baseUrl="https://openint.dev/connect"
            params={{
              token: clientToken,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
