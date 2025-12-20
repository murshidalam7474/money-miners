import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MOCK_ALL_INVESTORS, INVESTMENT_SCHEMES, formatCurrency, formatDate } from "@/lib/mockData";
import { Search, Users, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInvested: number;
  activeSchemes: number;
  status: string;
  joinedDate: string;
  scheme?: string;
  expectedPayout?: number;
}

export default function AdminInvestors() {
  const [search, setSearch] = useState("");
  const [investors, setInvestors] = useState<Investor[]>(MOCK_ALL_INVESTORS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newInvestor, setNewInvestor] = useState({
    name: "",
    email: "",
    phone: "",
    totalInvested: "",
    scheme: "",
    expectedPayout: "",
  });

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(search.toLowerCase()) ||
      investor.email.toLowerCase().includes(search.toLowerCase()) ||
      investor.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddInvestor = () => {
    if (!newInvestor.name || !newInvestor.email || !newInvestor.phone || !newInvestor.totalInvested || !newInvestor.scheme) {
      toast.error("Please fill all required fields");
      return;
    }

    const investor: Investor = {
      id: `INV${String(investors.length + 1).padStart(3, "0")}`,
      name: newInvestor.name,
      email: newInvestor.email,
      phone: newInvestor.phone,
      totalInvested: Number(newInvestor.totalInvested),
      activeSchemes: 1,
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
      scheme: newInvestor.scheme,
      expectedPayout: Number(newInvestor.expectedPayout) || 0,
    };

    setInvestors([investor, ...investors]);
    setNewInvestor({ name: "", email: "", phone: "", totalInvested: "", scheme: "", expectedPayout: "" });
    setDialogOpen(false);
    toast.success(`Investor ${investor.name} added successfully!`);
  };
  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">Investors</h2>
              <p className="text-muted-foreground">Manage all registered investors</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Investor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Investor</DialogTitle>
                    <DialogDescription>Enter investor details to add them to the platform.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter investor name"
                        value={newInvestor.name}
                        onChange={(e) => setNewInvestor({ ...newInvestor, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="investor@example.com"
                        value={newInvestor.email}
                        onChange={(e) => setNewInvestor({ ...newInvestor, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={newInvestor.phone}
                        onChange={(e) => setNewInvestor({ ...newInvestor, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invested">Investment Amount (₹) *</Label>
                      <Input
                        id="invested"
                        type="number"
                        placeholder="100000"
                        value={newInvestor.totalInvested}
                        onChange={(e) => setNewInvestor({ ...newInvestor, totalInvested: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheme">Investment Scheme *</Label>
                      <Select
                        value={newInvestor.scheme}
                        onValueChange={(value) => setNewInvestor({ ...newInvestor, scheme: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          {INVESTMENT_SCHEMES.map((scheme) => (
                            <SelectItem key={scheme.id} value={scheme.name}>
                              {scheme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payout">Expected Monthly Payout (₹)</Label>
                      <Input
                        id="payout"
                        type="number"
                        placeholder="8000"
                        value={newInvestor.expectedPayout}
                        onChange={(e) => setNewInvestor({ ...newInvestor, expectedPayout: e.target.value })}
                      />
                    </div>
                    <Button variant="hero" className="w-full mt-4" onClick={handleAddInvestor}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Investor
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                All Investors ({filteredInvestors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Invested</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Schemes</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvestors.map((investor, index) => (
                      <motion.tr
                        key={investor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-muted-foreground">{investor.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">{investor.name}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{investor.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{investor.phone}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-display font-semibold">{formatCurrency(investor.totalInvested)}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm">{investor.activeSchemes}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{formatDate(investor.joinedDate)}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
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
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInvestors.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No investors found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
