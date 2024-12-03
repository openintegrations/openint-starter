"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Embed({
  link,
  files,
}: {
  link: string;
  files: any[];
}) {
  return (
    <>
      <Card>
        <CardContent>
        {link && (
          <iframe
            src={link}
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
                    <th className="border p-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">ID</td>
                    <td className="border p-2 text-right">{file.id}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Name</td>
                    <td className="border p-2 text-right">{file.name}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">File URL</td>
                    <td className="border p-2 text-right">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open File
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mime Type</td>
                    <td className="border p-2 text-right">{file.mimeType || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Size</td>
                    <td className="border p-2 text-right">{file.size || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Drive ID</td>
                    <td className="border p-2 text-right">{file.drive_id}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Created At</td>
                    <td className="border p-2 text-right">{file.created_at || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Modified At</td>
                    <td className="border p-2 text-right">{file.modified_at || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Raw Data</td>
                    <td className="border p-2 text-right">
                      {file.raw_data ? JSON.stringify(file.raw_data) : 'N/A'}
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
