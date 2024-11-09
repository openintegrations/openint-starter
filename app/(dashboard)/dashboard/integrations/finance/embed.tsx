"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";

export function Embed({
  clientToken,
  balanceSheet,
  profitAndLoss,
}: {
  clientToken: string;
  balanceSheet: any;
  profitAndLoss: any;
}) {
  return (
    <>
      <Card style={{ height: "700px" }}>
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

      {balanceSheet && (
        <Card>
          <CardHeader>
            <CardTitle>Balance Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2">Start Period</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.startPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">End Period</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.endPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Currency</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.currency}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Current Assets</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalCurrentAssets.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Fixed Assets</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalFixedAssets.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Assets</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalAssets.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Current Liabilities</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalCurrentLiabilities.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Long Term Liabilities</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLongTermLiabilities.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Liabilities</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLiabilities.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Opening Balance Equity</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.openingBalanceEquity.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Net Income</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.netIncome.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Equity</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalEquity.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Liabilities and Equity</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLiabilitiesAndEquity.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {profitAndLoss && (
        <Card>
          <CardHeader>
            <CardTitle>Profit and Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2">Report Name</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.reportName}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Start Period</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.startPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">End Period</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.endPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Currency</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.currency}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Income</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.totalIncome.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Gross Profit</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.grossProfit.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Expenses</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.totalExpenses.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Net Operating Income</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.netOperatingIncome.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Net Income</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.netIncome.toFixed(2)}
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
