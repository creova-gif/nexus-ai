import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  // Route based on user role
  const roleRoutes: Record<string, string> = {
    bank_admin: "/admin",
    compliance_officer: "/compliance",
    financial_advisor: "/advisory",
    retail_customer: "/customer",
  };

  const targetRoute = roleRoutes[user.role] || "/";
  navigate(targetRoute);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-accent" />
    </div>
  );
}
