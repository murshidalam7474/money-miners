import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_INVESTOR,
  PROFIT_CHART_DATA,
  formatCurrency,
} from "@/lib/mockData";
import { Wallet, TrendingUp, PiggyBank, CircleDollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Total Invested",
    value: formatCurrency(MOCK_INVESTOR.totalInvested),
    icon: Wallet,
    color: "primary",
  },
  {
    label: "Active Schemes",
    value: MOCK_INVESTOR.activeSchemes.toString(),
    icon: PiggyBank,
    color: "accent",
  },
  {
    label: "Current Profit",
    value: formatCurrency(MOCK_INVESTOR.currentProfit),
    icon: TrendingUp,
    color: "success",
  },
  {
    label: "Wallet Balance",
    value: formatCurrency(MOCK_INVESTOR.walletBalance),
    icon: CircleDollarSign,
    color: "warning",
  },
];

export default function InvestorDashboard() {
  return (
    <DashboardLayout requiredRole="investor">
      <div className="space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-display font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === "primary"
                          ? "bg-gradient-gold"
                          : stat.color === "accent"
                          ? "bg-accent"
                          : stat.color === "success"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      <stat.icon
                        className={`w-6 h-6 ${
                          stat.color === "primary"
                            ? "text-primary-foreground"
                            : stat.color === "accent"
                            ? "text-accent-foreground"
                            : stat.color === "success"
                            ? "text-success-foreground"
                            : "text-warning-foreground"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Profit Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Profit Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PROFIT_CHART_DATA}>
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(215, 20%, 55%)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(215, 20%, 55%)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222, 47%, 8%)",
                        border: "1px solid hsl(222, 30%, 16%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 98%)",
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Profit"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="hsl(45, 93%, 47%)"
                      strokeWidth={2}
                      fill="url(#profitGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Investor ID</span>
                <span className="font-medium">{MOCK_INVESTOR.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{MOCK_INVESTOR.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{MOCK_INVESTOR.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">KYC Status</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  {MOCK_INVESTOR.kycStatus}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/investor/investments"
                className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">View Investments</span>
                  <span className="text-muted-foreground">→</span>
                </div>
              </a>
              <a
                href="/investor/transactions"
                className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Transaction History</span>
                  <span className="text-muted-foreground">→</span>
                </div>
              </a>
              <a
                href="/investor/withdrawals"
                className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Request Withdrawal</span>
                  <span className="text-muted-foreground">→</span>
                </div>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
