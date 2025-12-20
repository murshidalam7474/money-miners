import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_ALL_WITHDRAWALS, formatCurrency, formatDate } from "@/lib/mockData";
import { ArrowUpCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState(MOCK_ALL_WITHDRAWALS);

  const handleApprove = (id: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === id ? { ...w, status: "Approved" as const } : w
      )
    );
    toast.success("Withdrawal approved successfully!");
  };

  const handleReject = (id: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === id ? { ...w, status: "Rejected" as const } : w
      )
    );
    toast.error("Withdrawal rejected");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-success/10 text-success";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "";
    }
  };

  const pendingCount = withdrawals.filter((w) => w.status === "Pending").length;

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">Withdrawal Requests</h2>
          <p className="text-muted-foreground">
            Manage withdrawal requests • {pendingCount} pending
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="w-5 h-5" />
                All Withdrawal Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Investor</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bank</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal, index) => (
                      <motion.tr
                        key={withdrawal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-muted-foreground">{withdrawal.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{withdrawal.investorName}</p>
                            <p className="text-xs text-muted-foreground">{withdrawal.investorId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-display font-semibold">{formatCurrency(withdrawal.amount)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{formatDate(withdrawal.requestDate)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{withdrawal.bankDetails}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getStatusIcon(withdrawal.status)}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(withdrawal.status)}`}>
                              {withdrawal.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {withdrawal.status === "Pending" ? (
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApprove(withdrawal.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleReject(withdrawal.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground text-center block">—</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          Note: Changes are not persisted after page refresh (demo mode)
        </p>
      </div>
    </DashboardLayout>
  );
}
