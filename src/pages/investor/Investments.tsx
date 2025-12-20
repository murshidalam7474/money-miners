import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_INVESTMENTS, formatCurrency, formatDate } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function InvestorInvestments() {
  return (
    <DashboardLayout requiredRole="investor">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">My Investments</h2>
          <p className="text-muted-foreground">Track all your active investments and returns</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4"
        >
          {MOCK_INVESTMENTS.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">{investment.schemeName}</h3>
                        <p className="text-sm text-muted-foreground">ID: {investment.id}</p>
                        <p className="text-sm text-muted-foreground">Started: {formatDate(investment.startDate)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                      <div className="text-center lg:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Invested</p>
                        <p className="font-display font-semibold">{formatCurrency(investment.investedAmount)}</p>
                      </div>
                      <div className="text-center lg:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                        <p className="font-display font-semibold">{formatCurrency(investment.currentValue)}</p>
                      </div>
                      <div className="text-center lg:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Profit</p>
                        <p className="font-display font-semibold text-success">
                          +{formatCurrency(investment.profit)}
                        </p>
                      </div>
                      <div className="text-center lg:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Return</p>
                        <div className="flex items-center justify-center lg:justify-end gap-1">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="font-display font-semibold text-success">{investment.returnRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        {investment.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Want to invest more?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact our team to explore more investment opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
