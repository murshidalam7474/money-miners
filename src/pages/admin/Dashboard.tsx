import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_ALL_INVESTORS,
  MOCK_ALL_WITHDRAWALS,
  PLATFORM_STATS,
  PROFIT_DISTRIBUTION_DATA,
  INVESTOR_STATS_DATA,
  formatCurrency,
} from "@/lib/mockData";
import { Users, Wallet, TrendingUp, Clock, DollarSign, PiggyBank, CircleDollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
  Line,
} from "recharts";

const stats = [
  {
    label: "Total Investors",
    value: MOCK_ALL_INVESTORS.length.toString(),
    icon: Users,
    color: "primary",
  },
  {
    label: "Capital Managed",
    value: PLATFORM_STATS.capitalManaged,
    icon: Wallet,
    color: "accent",
  },
  {
    label: "Pending Withdrawals",
    value: MOCK_ALL_WITHDRAWALS.filter((w) => w.status === "Pending").length.toString(),
    icon: Clock,
    color: "warning",
  },
  {
    label: "Avg Return",
    value: PLATFORM_STATS.avgMonthlyReturn,
    icon: TrendingUp,
    color: "success",
  },
];

const financialStats = [
  {
    label: "Total Profit Generated",
    value: formatCurrency(PLATFORM_STATS.totalProfitGenerated),
    icon: DollarSign,
    color: "success",
  },
  {
    label: "Paid to Investors",
    value: formatCurrency(PLATFORM_STATS.paidPayouts),
    icon: CircleDollarSign,
    color: "primary",
  },
  {
    label: "Pending Payouts",
    value: formatCurrency(PLATFORM_STATS.pendingPayouts),
    icon: Clock,
    color: "warning",
  },
  {
    label: "Net Platform Profit",
    value: formatCurrency(PLATFORM_STATS.netProfitAfterDistribution),
    icon: PiggyBank,
    color: "accent",
  },
];

export default function AdminDashboard() {
  const pendingWithdrawals = MOCK_ALL_WITHDRAWALS.filter((w) => w.status === "Pending");
  const recentInvestors = MOCK_ALL_INVESTORS.slice(0, 5);

  return (
    <DashboardLayout requiredRole="admin">
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

        {/* Financial Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="elevated" className="mb-6">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {financialStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
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
                          className={`w-5 h-5 ${
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
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <p className="text-xl font-display font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Investors & Investment Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Monthly Investors & Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={INVESTOR_STATS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(215, 20%, 55%)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke="hsl(215, 20%, 55%)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value / 100000}L`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="hsl(215, 20%, 55%)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222, 47%, 8%)",
                          border: "1px solid hsl(222, 30%, 16%)",
                          borderRadius: "8px",
                          color: "hsl(210, 40%, 98%)",
                        }}
                        formatter={(value: number, name: string) => [
                          name === "invested" ? formatCurrency(value) : value,
                          name === "invested" ? "Investment" : "Investors"
                        ]}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="invested" name="Investment" fill="hsl(45, 93%, 47%)" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="investors" name="Investors" stroke="hsl(142, 71%, 45%)" strokeWidth={3} dot={{ fill: "hsl(142, 71%, 45%)" }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profit Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Profit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PROFIT_DISTRIBUTION_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {PROFIT_DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222, 47%, 8%)",
                          border: "1px solid hsl(222, 30%, 16%)",
                          borderRadius: "8px",
                          color: "hsl(210, 40%, 98%)",
                        }}
                        formatter={(value: number) => [formatCurrency(value), "Amount"]}
                      />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Withdrawals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pending Withdrawals</span>
                  <a href="/admin/withdrawals" className="text-sm text-primary font-normal hover:underline">
                    View All
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWithdrawals.slice(0, 4).map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{withdrawal.investorName}</p>
                          <p className="text-xs text-muted-foreground">{withdrawal.id}</p>
                        </div>
                      </div>
                      <p className="font-display font-semibold">{formatCurrency(withdrawal.amount)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Investors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Investors</span>
                <a href="/admin/investors" className="text-sm text-primary font-normal hover:underline">
                  View All
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Investor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invested</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Schemes</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvestors.map((investor) => (
                      <tr key={investor.id} className="border-b border-border/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-muted-foreground">{investor.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-display font-semibold">
                            {formatCurrency(investor.totalInvested)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{investor.activeSchemes}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              investor.status === "Active"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {investor.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
