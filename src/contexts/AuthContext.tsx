import React, { createContext, useContext, useState, ReactNode } from "react";
import { DEMO_CREDENTIALS } from "@/lib/mockData";

type UserRole = "investor" | "admin" | null;

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    // Check investor credentials
    if (
      email === DEMO_CREDENTIALS.investor.email &&
      password === DEMO_CREDENTIALS.investor.password
    ) {
      setUser({
        email,
        role: "investor",
        name: "Demo Investor",
      });
      return { success: true };
    }

    // Check admin credentials
    if (
      email === DEMO_CREDENTIALS.admin.email &&
      password === DEMO_CREDENTIALS.admin.password
    ) {
      setUser({
        email,
        role: "admin",
        name: "Admin User",
      });
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
