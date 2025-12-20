import { ReactNode } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  TrendingUp,
  LayoutDashboard,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  LogOut,
  Menu,
  X,
  FileText,
  Home,
} from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole: "investor" | "admin";
}

const investorLinks = [
  { to: "/investor", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/investor/investments", icon: Wallet, label: "My Investments" },
  { to: "/investor/transactions", icon: ArrowDownCircle, label: "Transactions" },
  { to: "/investor/withdrawals", icon: ArrowUpCircle, label: "Withdrawals" },
];

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/investors", icon: Users, label: "Investors" },
  { to: "/admin/schemes", icon: FileText, label: "Schemes" },
  { to: "/admin/withdrawals", icon: ArrowUpCircle, label: "Withdrawals" },
];

export function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to={user?.role === "admin" ? "/admin" : "/investor"} replace />;
  }

  const links = requiredRole === "admin" ? adminLinks : investorLinks;

  return (
    <div className="min-h-screen bg-background flex pb-10">
      {/* Developer Credit Moving Banner - Top */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-background/30 backdrop-blur-sm border-b border-border/30 py-1.5 overflow-hidden">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="whitespace-nowrap text-xs text-muted-foreground"
        >
          <span className="inline-block px-8">
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Web Developer • 
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Web Developer
          </span>
        </motion.div>
      </div>

      {/* Developer Credit Moving Banner - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-background/30 backdrop-blur-sm border-t border-border/30 py-1.5 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="whitespace-nowrap text-xs text-muted-foreground"
        >
          <span className="inline-block px-8">
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo • 
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo
          </span>
        </motion.div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ transform: undefined }}
      >
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Money<span className="text-gradient-gold">Miners</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-gold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          <span className="font-display font-bold">
            {requiredRole === "admin" ? "Admin" : "Investor"} Dashboard
          </span>
          <div className="w-10" />
        </header>

        {/* Desktop header */}
        <header className="hidden lg:flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <h1 className="font-display text-2xl font-bold">
            {requiredRole === "admin" ? "Admin" : "Investor"} Dashboard
          </h1>
          <div className="text-sm text-muted-foreground">
            Welcome back, <span className="text-foreground font-medium">{user?.name}</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      {/* Close button for mobile sidebar */}
      {sidebarOpen && (
        <button
          className="fixed top-4 left-[290px] z-50 lg:hidden p-2 rounded-full bg-card border border-border"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
