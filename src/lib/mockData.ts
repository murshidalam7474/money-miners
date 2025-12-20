// Demo credentials
export const DEMO_CREDENTIALS = {
  investor: {
    email: "investor@demo.com",
    password: "demo123",
    role: "investor" as const,
  },
  admin: {
    email: "admin@demo.com",
    password: "admin123",
    role: "admin" as const,
  },
};

// Investment schemes
export const INVESTMENT_SCHEMES = [
  {
    id: "1",
    name: "Monthly Income Plan",
    description: "Stable returns with monthly payouts. Ideal for passive income seekers.",
    minInvestment: 50000,
    targetReturn: "6–8%",
    returnPeriod: "month",
    risk: "Medium" as const,
    features: ["Monthly payouts", "Capital preservation focus", "Diversified portfolio"],
    color: "accent",
  },
  {
    id: "2",
    name: "Growth Plan",
    description: "Higher growth potential for aggressive investors. Compound your wealth.",
    minInvestment: 100000,
    targetReturn: "8–12%",
    returnPeriod: "month",
    risk: "High" as const,
    features: ["Quarterly compounding", "Growth-focused", "Active trading"],
    color: "primary",
  },
];

// Mock investor data
export const MOCK_INVESTOR = {
  id: "INV001",
  name: "Demo Investor",
  email: "investor@demo.com",
  phone: "+91 98765 43210",
  joinedDate: "2024-06-15",
  kycStatus: "Verified",
  totalInvested: 250000,
  currentProfit: 18500,
  walletBalance: 28500,
  activeSchemes: 2,
};

// Mock investments for investor
export const MOCK_INVESTMENTS = [
  {
    id: "INV-001",
    schemeName: "Monthly Income Plan",
    investedAmount: 100000,
    currentValue: 108500,
    profit: 8500,
    startDate: "2024-08-01",
    status: "Active",
    returnRate: "7.2%",
  },
  {
    id: "INV-002",
    schemeName: "Growth Plan",
    investedAmount: 150000,
    currentValue: 165000,
    profit: 15000,
    startDate: "2024-07-15",
    status: "Active",
    returnRate: "9.8%",
  },
];

// Mock transactions
export const MOCK_TRANSACTIONS = [
  {
    id: "TXN-001",
    type: "Profit Credit",
    amount: 7200,
    date: "2024-12-01",
    status: "Completed",
    scheme: "Monthly Income Plan",
  },
  {
    id: "TXN-002",
    type: "Profit Credit",
    amount: 14700,
    date: "2024-12-01",
    status: "Completed",
    scheme: "Growth Plan",
  },
  {
    id: "TXN-003",
    type: "Profit Credit",
    amount: 6800,
    date: "2024-11-01",
    status: "Completed",
    scheme: "Monthly Income Plan",
  },
  {
    id: "TXN-004",
    type: "Investment",
    amount: -150000,
    date: "2024-07-15",
    status: "Completed",
    scheme: "Growth Plan",
  },
  {
    id: "TXN-005",
    type: "Investment",
    amount: -100000,
    date: "2024-08-01",
    status: "Completed",
    scheme: "Monthly Income Plan",
  },
];

// Mock withdrawals
export const MOCK_WITHDRAWALS = [
  {
    id: "WD-001",
    amount: 10000,
    requestDate: "2024-11-20",
    status: "Approved",
    processedDate: "2024-11-22",
    bankDetails: "HDFC ***4521",
  },
  {
    id: "WD-002",
    amount: 5000,
    requestDate: "2024-12-10",
    status: "Pending",
    processedDate: null,
    bankDetails: "HDFC ***4521",
  },
];

// Mock all investors (for admin)
export const MOCK_ALL_INVESTORS = [
  {
    id: "INV001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    totalInvested: 250000,
    activeSchemes: 2,
    status: "Active",
    joinedDate: "2024-06-15",
  },
  {
    id: "INV002",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    totalInvested: 500000,
    activeSchemes: 1,
    status: "Active",
    joinedDate: "2024-05-20",
  },
  {
    id: "INV003",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    totalInvested: 150000,
    activeSchemes: 1,
    status: "Active",
    joinedDate: "2024-07-10",
  },
  {
    id: "INV004",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "+91 65432 10987",
    totalInvested: 300000,
    activeSchemes: 2,
    status: "Pending KYC",
    joinedDate: "2024-08-05",
  },
  {
    id: "INV005",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 54321 09876",
    totalInvested: 750000,
    activeSchemes: 2,
    status: "Active",
    joinedDate: "2024-04-12",
  },
];

// Mock all withdrawals (for admin)
export const MOCK_ALL_WITHDRAWALS = [
  {
    id: "WD-001",
    investorId: "INV001",
    investorName: "Rahul Sharma",
    amount: 10000,
    requestDate: "2024-12-15",
    status: "Pending",
    bankDetails: "HDFC ***4521",
  },
  {
    id: "WD-002",
    investorId: "INV002",
    investorName: "Priya Patel",
    amount: 25000,
    requestDate: "2024-12-14",
    status: "Pending",
    bankDetails: "ICICI ***7890",
  },
  {
    id: "WD-003",
    investorId: "INV005",
    investorName: "Vikram Singh",
    amount: 50000,
    requestDate: "2024-12-10",
    status: "Approved",
    bankDetails: "SBI ***1234",
  },
  {
    id: "WD-004",
    investorId: "INV003",
    investorName: "Amit Kumar",
    amount: 8000,
    requestDate: "2024-12-08",
    status: "Rejected",
    bankDetails: "Axis ***5678",
  },
];

// Chart data for dashboard
export const PROFIT_CHART_DATA = [
  { month: "Jul", profit: 12000 },
  { month: "Aug", profit: 15500 },
  { month: "Sep", profit: 14200 },
  { month: "Oct", profit: 18900 },
  { month: "Nov", profit: 21500 },
  { month: "Dec", profit: 18500 },
];

// Platform statistics
export const PLATFORM_STATS = {
  capitalManaged: "₹5 Cr",
  activeInvestors: 320,
  avgMonthlyReturn: "6–10%",
  totalPayouts: "₹85 Lakh",
  totalProfitGenerated: 4850000, // 48.5 Lakh
  pendingPayouts: 93000, // Pending withdrawals amount
  paidPayouts: 4757000, // Already distributed
  netProfitAfterDistribution: 4250000, // Platform net profit
};

// Profit distribution data for admin chart
export const PROFIT_DISTRIBUTION_DATA = [
  { name: "Distributed to Investors", value: 4757000, color: "hsl(142, 71%, 45%)" },
  { name: "Pending Payouts", value: 93000, color: "hsl(38, 92%, 50%)" },
  { name: "Platform Profit", value: 4250000, color: "hsl(45, 93%, 47%)" },
];

// Investor investment stats for admin
export const INVESTOR_STATS_DATA = [
  { month: "Jul", investors: 45, invested: 1200000 },
  { month: "Aug", investors: 62, invested: 1800000 },
  { month: "Sep", investors: 58, invested: 1500000 },
  { month: "Oct", investors: 78, invested: 2200000 },
  { month: "Nov", investors: 92, invested: 2800000 },
  { month: "Dec", investors: 85, invested: 2400000 },
];

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
