import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { INVESTMENT_SCHEMES, formatCurrency } from "@/lib/mockData";
import { BarChart3, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";

interface Scheme {
  id: string;
  name: string;
  description: string;
  minInvestment: number;
  targetReturn: string;
  returnPeriod: string;
  risk: "Low" | "Medium" | "High";
  features: string[];
  color: string;
}

export default function AdminSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>(INVESTMENT_SCHEMES as Scheme[]);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minInvestment: "",
    targetReturn: "",
    risk: "Medium" as "Low" | "Medium" | "High",
    features: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      minInvestment: "",
      targetReturn: "",
      risk: "Medium",
      features: "",
    });
    setEditingScheme(null);
    setIsAddingNew(false);
  };

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormData({
      name: scheme.name,
      description: scheme.description,
      minInvestment: scheme.minInvestment.toString(),
      targetReturn: scheme.targetReturn,
      risk: scheme.risk,
      features: scheme.features.join(", "),
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.minInvestment || !formData.targetReturn) {
      toast.error("Please fill in all required fields");
      return;
    }

    const schemeData: Scheme = {
      id: editingScheme?.id || String(schemes.length + 1),
      name: formData.name,
      description: formData.description,
      minInvestment: parseFloat(formData.minInvestment),
      targetReturn: formData.targetReturn,
      returnPeriod: "month",
      risk: formData.risk,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      color: formData.risk === "High" ? "primary" : "accent",
    };

    if (editingScheme) {
      setSchemes(schemes.map((s) => (s.id === editingScheme.id ? schemeData : s)));
      toast.success("Scheme updated successfully!");
    } else {
      setSchemes([...schemes, schemeData]);
      toast.success("Scheme added successfully!");
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    setSchemes(schemes.filter((s) => s.id !== id));
    toast.success("Scheme deleted successfully!");
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
            <h2 className="font-display text-2xl font-bold mb-2">Investment Schemes</h2>
            <p className="text-muted-foreground">Manage investment plans</p>
          </div>

          <Button variant="hero" onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add Scheme
          </Button>
        </motion.div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingScheme) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>{editingScheme ? "Edit Scheme" : "Add New Scheme"}</CardTitle>
                <CardDescription>
                  {editingScheme ? "Update scheme details" : "Create a new investment scheme"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Scheme Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Growth Plan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minInvestment">Minimum Investment (₹) *</Label>
                    <Input
                      id="minInvestment"
                      type="number"
                      value={formData.minInvestment}
                      onChange={(e) => setFormData({ ...formData, minInvestment: e.target.value })}
                      placeholder="e.g., 50000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetReturn">Target Return *</Label>
                    <Input
                      id="targetReturn"
                      value={formData.targetReturn}
                      onChange={(e) => setFormData({ ...formData, targetReturn: e.target.value })}
                      placeholder="e.g., 6–8%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <select
                      id="risk"
                      value={formData.risk}
                      onChange={(e) => setFormData({ ...formData, risk: e.target.value as "Low" | "Medium" | "High" })}
                      className="w-full h-10 px-3 rounded-lg bg-input border border-border text-foreground"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the scheme"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="e.g., Monthly payouts, Diversified portfolio"
                  />
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button variant="hero" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingScheme ? "Update Scheme" : "Add Scheme"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Schemes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        scheme.color === "primary" ? "bg-gradient-gold" : "bg-accent"
                      }`}
                    >
                      <BarChart3
                        className={`w-6 h-6 ${
                          scheme.color === "primary" ? "text-primary-foreground" : "text-accent-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(scheme)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(scheme.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{scheme.name}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                      <p className="font-display font-bold">{formatCurrency(scheme.minInvestment)}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Target Return</p>
                      <p className="font-display font-bold text-success">{scheme.targetReturn}/mo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Risk:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        scheme.risk === "High"
                          ? "bg-destructive/10 text-destructive"
                          : scheme.risk === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {scheme.risk}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          Note: Changes are not persisted after page refresh (demo mode)
        </p>
      </div>
    </DashboardLayout>
  );
}
