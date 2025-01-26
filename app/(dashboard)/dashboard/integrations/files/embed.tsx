"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntFrontend } from "@openint/connect";

export function Embed({
  embedConnectLink,
  filePickerLink,
  files,
}: {
  embedConnectLink: string;
  filePickerLink: string;
  files: any[];
}) {
  useEffect(() => {
    if (filePickerLink) {
      OpenIntFrontend.listenFilePicker({
        onSelect: (files) => {
          console.log("files selected", files);
        },
        onClose: () => {
          console.log("closed");
        },
      });
    }
  }, [filePickerLink, embedConnectLink]);

  return (
    <>
      <Card>
        <CardContent>
          {embedConnectLink && (
            <iframe
              src={embedConnectLink}
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
          {filePickerLink && (
            <iframe
              src={filePickerLink}
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </CardContent>
      </Card>
      {files &&
        files.map((file, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Unified File Details</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Property</th>
                    <th className="border p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">ID</td>
                    <td className="border p-2">{file.id}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Name</td>
                    <td className="border p-2">{file.name}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Path</td>
                    <td className="border p-2">{file.path}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Type</td>
                    <td className="border p-2">{file.type}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mime Type</td>
                    <td className="border p-2">{file.mime_type || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Size</td>
                    <td className="border p-2">{file.size || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Created At</td>
                    <td className="border p-2">{file.created_at || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Updated At</td>
                    <td className="border p-2">{file.updated_at || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Downloadable</td>
                    <td className="border p-2">
                      {file.downloadable?.toString() || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Exportable</td>
                    <td className="border p-2">
                      {file.exportable?.toString() || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Export Formats</td>
                    <td className="border p-2">
                      {file.export_formats
                        ? JSON.stringify(file.export_formats)
                        : "N/A"}
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
