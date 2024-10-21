"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";
import { useEffect, useState } from "react";

export function Embed({
  clientToken,
  files,
}: {
  clientToken: string;
  files: any[];
}) {
  // const [resources, setResources] = useState([]);

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:4000/api/v0/core/resource",
  //         {
  //           method: "GET",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${clientToken}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch resources");
  //       }

  //       const data = await response.json();

  //       console.log("CORS data", data);
  //       setResources(data);
  //     } catch (error) {
  //       console.error("Error fetching resources:", error);
  //     }
  //   };

  //   if (clientToken) {
  //     fetchResources();
  //   }
  // }, [clientToken]);
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
      {files &&
        files.map((file, index) => (
          <Card key={index}>
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
                    <td className="border p-2 text-right">{file.name}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">ID</td>
                    <td className="border p-2 text-right">{file.id}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mime Type</td>
                    <td className="border p-2 text-right">{file.mimeType}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Size</td>
                    <td className="border p-2 text-right">{file.size}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Link</td>
                    <td className="border p-2 text-right">
                      <a
                        href={file.webViewLink}
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
        ))}
    </>
  );
}
