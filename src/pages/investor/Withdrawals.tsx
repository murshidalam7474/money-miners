import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_WITHDRAWALS, MOCK_INVESTOR, formatCurrency, formatDate } from "@/lib/mockData";
import { ArrowUpCircle, Clock, CheckCircle2, XCircle, Wallet } from "lucide-react";
import { toast } from "sonner";

export default function InvestorWithdrawals() {
  const [withdrawals, setWithdrawals] = useState(MOCK_WITHDRAWALS);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > MOCK_INVESTOR.walletBalance) {
      toast.error("Insufficient wallet balance");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newWithdrawal = {
      id: `WD-${String(withdrawals.length + 1).padStart(3, "0")}`,
      amount: withdrawAmount,
      requestDate: new Date().toISOString().split("T")[0],
      status: "Pending" as const,
      processedDate: null,
      bankDetails: "HDFC ***4521",
    };

    setWithdrawals([newWithdrawal, ...withdrawals]);
    setAmount("");
    setIsSubmitting(false);
    toast.success("Withdrawal request submitted successfully!");
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

  return (
    <DashboardLayout requiredRole="investor">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">Withdrawals</h2>
          <p className="text-muted-foreground">Request and track your withdrawals</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Withdrawal Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle className="w-5 h-5 text-primary" />
                  New Withdrawal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-xl font-display font-bold">{formatCurrency(MOCK_INVESTOR.walletBalance)}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="100"
                      max={MOCK_INVESTOR.walletBalance}
                    />
                    <p className="text-xs text-muted-foreground">Minimum: ₹100</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Bank Account</Label>
                    <div className="p-3 rounded-lg bg-muted text-sm">
                      HDFC Bank - ***4521
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Request Withdrawal"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Withdrawal History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawals.map((withdrawal, index) => (
                    <motion.div
                      key={withdrawal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <ArrowUpCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{withdrawal.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(withdrawal.requestDate)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-display font-semibold">{formatCurrency(withdrawal.amount)}</p>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          {getStatusIcon(withdrawal.status)}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(withdrawal.status)}`}>
                            {withdrawal.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
