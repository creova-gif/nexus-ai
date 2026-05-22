import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Wallet, Send, MessageSquare } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import AIChat from "@/components/AIChat";

export default function Customer() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: overview, isLoading: overviewLoading } = trpc.openbanking.getFinancialOverview.useQuery();
  const { data: goals } = trpc.advisory.getFinancialGoals.useQuery();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  if (user.role !== "retail_customer") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Your personalized financial dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Financial Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-600" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overviewLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold">${overview?.totalBalance || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Across {overview?.accountCount || 0} accounts</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goals?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active goals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Connected Banks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview?.institutions || 0}</div>
              <p className="text-xs text-muted-foreground">Financial institutions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Spending Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Insights</CardTitle>
              <CardDescription>AI-powered analysis of your spending patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">This Month</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Groceries</span>
                      <span className="font-semibold">$450</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Dining</span>
                      <span className="font-semibold">$320</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Detailed Insights
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Financial Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track progress towards your objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals && goals.length > 0 ? (
                  goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="border-b border-border pb-3 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">{goal.goalName}</p>
                          <p className="text-xs text-muted-foreground">{goal.goalType}</p>
                        </div>
                        <Badge variant="outline">{goal.status}</Badge>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>${goal.currentAmount || 0}</span>
                        <span>${goal.targetAmount}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{
                            width: `${(parseFloat(goal.currentAmount?.toString() || "0") / parseFloat(goal.targetAmount.toString())) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No goals yet</p>
                )}
                <Button variant="outline" className="w-full">
                  Create New Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Banking & Support */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Open Banking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Open Banking
              </CardTitle>
              <CardDescription>Manage your connected accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Connected Institutions</p>
                  <p className="text-xs text-muted-foreground">You have {overview?.institutions || 0} connected banks</p>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Connections
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Support */}
          <AIChat title="AI Assistant" placeholder="Ask about your finances..." />
        </div>
      </div>
    </div>
  );
}
