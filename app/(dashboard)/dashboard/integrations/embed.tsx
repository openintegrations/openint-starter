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
  console.log("clientToken", clientToken);
  return (
    <>
      <Card style={{ height: "700px" }}>
        <CardContent>
          <OpenIntConnectEmbed
            width={800}
            height={800}
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
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Item</th>
                  <th className="border p-2 text-right">Amount (USD)</th>
                </tr>
              </thead>
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
                  <td className="border p-2">Accounting Standard</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.accountingStandard}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Current Assets
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalCurrentAssets?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Fixed Assets
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalFixedAssets?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Total Assets</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalAssets?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Current Liabilities
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalCurrentLiabilities?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Long Term Liabilities
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLongTermLiabilities?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Liabilities
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLiabilities?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Opening Balance Equity</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.openingBalanceEquity?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Net Income</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.netIncome?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Total Equity</td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalEquity?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Total Liabilities and Equity
                  </td>
                  <td className="border p-2 text-right">
                    {balanceSheet.totalLiabilitiesAndEquity?.toFixed(2)}
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
              <thead>
                <tr>
                  <th className="border p-2 text-left" colSpan={2}>
                    {profitAndLoss.reportName} ({profitAndLoss.startPeriod} to{" "}
                    {profitAndLoss.endPeriod})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Currency</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.currency}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Accounting Standard</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.accountingStandard}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Total Income</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.totalIncome?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Gross Profit</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.grossProfit?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Total Expenses</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.totalExpenses?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Net Operating Income
                  </td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.netOperatingIncome?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Net Income</td>
                  <td className="border p-2 text-right">
                    {profitAndLoss.netIncome?.toFixed(2)}
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
