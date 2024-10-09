"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";

export function Embed({
  clientToken,
  files,
}: {
  clientToken: string;
  files: any;
}) {
  return (
    <>
      <Card>
        <CardContent>
          <OpenIntConnectEmbed
            width={800}
            height={600}
            params={{
              token: clientToken,
            }}
          />
        </CardContent>
      </Card>
      {files && (
        <Card>
          <CardHeader>
            <CardTitle>Google Drive File Details</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Property</th>
                  <th className="border p-2 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Name</td>
                  <td className="border p-2 text-right">{files.name}</td>
                </tr>
                <tr>
                  <td className="border p-2">ID</td>
                  <td className="border p-2 text-right">{files.id}</td>
                </tr>
                <tr>
                  <td className="border p-2">Mime Type</td>
                  <td className="border p-2 text-right">{files.mimeType}</td>
                </tr>
                <tr>
                  <td className="border p-2">Size</td>
                  <td className="border p-2 text-right">{files.size}</td>
                </tr>
                <tr>
                  <td className="border p-2">Link</td>
                  <td className="border p-2 text-right">
                    <a
                      href={files.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open File
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
