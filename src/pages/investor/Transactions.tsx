import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_TRANSACTIONS, formatCurrency, formatDate } from "@/lib/mockData";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function InvestorTransactions() {
  return (
    <DashboardLayout requiredRole="investor">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">Transactions</h2>
          <p className="text-muted-foreground">View all your transaction history</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Scheme</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_TRANSACTIONS.map((transaction, index) => {
                      const isCredit = transaction.amount > 0;
                      return (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="text-sm font-mono text-muted-foreground">{transaction.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {isCredit ? (
                                <ArrowDownCircle className="w-4 h-4 text-success" />
                              ) : (
                                <ArrowUpCircle className="w-4 h-4 text-primary" />
                              )}
                              <span className="text-sm font-medium">{transaction.type}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm">{transaction.scheme}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">{formatDate(transaction.date)}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`text-sm font-semibold ${isCredit ? "text-success" : "text-foreground"}`}>
                              {isCredit ? "+" : ""}{formatCurrency(Math.abs(transaction.amount))}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                              {transaction.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
