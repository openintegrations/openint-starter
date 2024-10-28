"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenIntConnectEmbed } from "@openint/connect";

export function Embed({
  clientToken,
  balanceSheet,
  profitAndLoss,
  cashFlow,
  transactionList,
  customerBalance,
  customerIncome,
  accounts,
}: {
  clientToken: string;
  balanceSheet: any;
  profitAndLoss: any;
  cashFlow: any;
  transactionList: any;
  customerBalance: any;
  customerIncome: any;
  accounts: any;
}) {
  console.log("clientToken", clientToken);
  return (
    <>
      <Card style={{ height: "700px" }}>
        <CardContent>
          <OpenIntConnectEmbed
            // baseUrl={"http://localhost:4000"}
            width={800}
            height={600}
            params={{
              token: clientToken,
            }}
          />
        </CardContent>
      </Card>

      {/* Balance Sheet */}
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

      {/* Profit and Loss */}
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

      {/* Cash Flow */}
      {cashFlow && (
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2">Report Name</td>
                  <td className="border p-2 text-right">
                    {cashFlow.reportName}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Start Period</td>
                  <td className="border p-2 text-right">
                    {cashFlow.startPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">End Period</td>
                  <td className="border p-2 text-right">
                    {cashFlow.endPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Currency</td>
                  <td className="border p-2 text-right">{cashFlow.currency}</td>
                </tr>
                <tr>
                  <td className="border p-2">Net Income</td>
                  <td className="border p-2 text-right">
                    {cashFlow.netIncome?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Total Operating Adjustments</td>
                  <td className="border p-2 text-right">
                    {cashFlow.totalOperatingAdjustments?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    Net Cash from Operating Activities
                  </td>
                  <td className="border p-2 text-right">
                    {cashFlow.netCashFromOperatingActivities?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    Net Cash from Financing Activities
                  </td>
                  <td className="border p-2 text-right">
                    {cashFlow.netCashFromFinancingActivities?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Net Cash Increase</td>
                  <td className="border p-2 text-right">
                    {cashFlow.netCashIncrease?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Ending Cash</td>
                  <td className="border p-2 text-right">
                    {cashFlow.endingCash?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Transaction List */}
      {transactionList && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionList.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border p-2">{transaction.date}</td>
                    <td className="border p-2">
                      {transaction.transactionType}
                    </td>
                    <td className="border p-2 text-right">
                      {transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Customer Balance */}
      {customerBalance && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Customer</th>
                  <th className="border p-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {customerBalance.entries.map((entry, index) => (
                  <tr key={index}>
                    <td className="border p-2">{entry.customerName}</td>
                    <td className="border p-2 text-right">
                      {entry.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border p-2 font-semibold">Total Balance</td>
                  <td className="border p-2 text-right">
                    {customerBalance.totalBalance.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Customer Income */}
      {customerIncome && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Income</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Customer</th>
                  <th className="border p-2 text-right">Income</th>
                  <th className="border p-2 text-right">Expenses</th>
                  <th className="border p-2 text-right">Net Income</th>
                </tr>
              </thead>
              <tbody>
                {customerIncome.entries.map((entry, index) => (
                  <tr key={index}>
                    <td className="border p-2">{entry.customerName}</td>
                    <td className="border p-2 text-right">
                      {entry.totalIncome.toFixed(2)}
                    </td>
                    <td className="border p-2 text-right">
                      {entry.totalExpenses.toFixed(2)}
                    </td>
                    <td className="border p-2 text-right">
                      {entry.netIncome.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border p-2 font-semibold">Total</td>
                  <td className="border p-2 text-right">
                    {customerIncome.totalIncome.toFixed(2)}
                  </td>
                  <td className="border p-2 text-right">
                    {customerIncome.totalExpenses.toFixed(2)}
                  </td>
                  <td className="border p-2 text-right">
                    {customerIncome.netIncome.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {accounts && (
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Account Name</th>
                  <th className="border p-2 text-right">Account Type</th>
                </tr>
              </thead>
              <tbody>
                {accounts.items.map((account, index) => (
                  <tr key={index}>
                    <td className="border p-2">{account.name}</td>
                    <td className="border p-2 text-right">{account.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
