"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";
import React from "react";

export function Embed({
  clientToken,
  accounts,
  contacts,
}: {
  clientToken: string;
  accounts: any;
  contacts: any;
}) {
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
      <div>
        {accounts && (
          <>
            <h2 className="text-xl font-bold mb-4">Accounts</h2>
            <div>
              {accounts.items.map((account) => (
                <Card key={account.id} className="account-card mb-4">
                  <CardHeader>
                    <CardTitle>
                      {account.raw_data.properties.name || "Unnamed Account"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Website: {account.raw_data.properties.website || "N/A"}
                    </p>
                    <p>
                      Industry: {account.raw_data.properties.industry || "N/A"}
                    </p>
                    <p>
                      Employees:{" "}
                      {account.raw_data.properties.numberofemployees || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
        {contacts && (
          <>
            <h2 className="text-xl font-bold mt-8 mb-4">Contacts</h2>
            <div>
              {contacts.items.map((contact) => (
                <Card key={contact.id} className="contact-card mb-4">
                  <CardHeader>
                    <CardTitle>
                      {contact.first_name} {contact.last_name || ""}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Email: {contact.email || "N/A"}</p>
                    <p>Phone: {contact.phone || "N/A"}</p>
                    <p>
                      Company: {contact.raw_data.properties.company || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
