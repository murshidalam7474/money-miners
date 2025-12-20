import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorInvestments from "./pages/investor/Investments";
import InvestorTransactions from "./pages/investor/Transactions";
import InvestorWithdrawals from "./pages/investor/Withdrawals";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInvestors from "./pages/admin/Investors";
import AdminSchemes from "./pages/admin/Schemes";
import AdminWithdrawals from "./pages/admin/Withdrawals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Investor Routes */}
            <Route path="/investor" element={<InvestorDashboard />} />
            <Route path="/investor/investments" element={<InvestorInvestments />} />
            <Route path="/investor/transactions" element={<InvestorTransactions />} />
            <Route path="/investor/withdrawals" element={<InvestorWithdrawals />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/investors" element={<AdminInvestors />} />
            <Route path="/admin/schemes" element={<AdminSchemes />} />
            <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
