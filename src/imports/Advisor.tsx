import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Target, PieChart } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Advisor() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: insights, isLoading: insightsLoading } = trpc.advisory.getSpendingInsights.useQuery();
  const { data: recommendations, isLoading: recsLoading } = trpc.advisory.getRecommendations.useQuery();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  if (user.role !== "financial_advisor") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Financial Advisory Console</h1>
          <p className="text-muted-foreground">Manage client portfolios and provide personalized recommendations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <PieChart className="w-4 h-4 text-blue-600" />
                Active Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Under management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                AUM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4.2M</div>
              <p className="text-xs text-muted-foreground">Assets under management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Action items</p>
            </CardContent>
          </Card>
        </div>

        {/* Client Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Client Spending Insights</CardTitle>
            <CardDescription>AI-analyzed patterns across your client base</CardDescription>
          </CardHeader>
          <CardContent>
            {insightsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
              </div>
            ) : insights && insights.length > 0 ? (
              <div className="space-y-4">
                {insights.slice(0, 5).map((insight, idx) => (
                  <div key={idx} className="border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm">{insight.category}</p>
                        <p className="text-xs text-muted-foreground">{insight.insight}</p>
                      </div>
                      <Badge variant="outline">{insight.trend}</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">No insights available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Generated recommendations for clients</CardDescription>
            </CardHeader>
            <CardContent>
              {recsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-accent" />
                </div>
              ) : recommendations && recommendations.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.slice(0, 4).map((rec, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-1">{rec.recommendationType}</p>
                      <p className="text-xs text-muted-foreground">{rec.rationale || "Recommended for your portfolio"}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="text-xs">{rec.riskLevel || "medium"} risk</Badge>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No recommendations yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Rebalancing</CardTitle>
              <CardDescription>Suggested portfolio adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold">Current Allocation</span>
                    <span className="text-xs text-muted-foreground">vs Recommended</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Equities</span>
                      <span>60% → 65%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Bonds</span>
                      <span>30% → 25%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Review Rebalancing Strategy</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Management */}
        <Card>
          <CardHeader>
            <CardTitle>Client Portfolio Overview</CardTitle>
            <CardDescription>Top performing and at-risk portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Client Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Portfolio Value</th>
                    <th className="text-left py-3 px-4 font-semibold">YTD Return</th>
                    <th className="text-left py-3 px-4 font-semibold">Risk Level</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Smith", value: "$250,000", return: "+8.5%", risk: "Moderate", status: "On Track" },
                    { name: "Sarah Johnson", value: "$180,000", return: "+12.3%", risk: "Aggressive", status: "Excellent" },
                    { name: "Michael Chen", value: "$320,000", return: "-2.1%", risk: "Conservative", status: "Review" },
                    { name: "Emma Wilson", value: "$145,000", return: "+5.7%", risk: "Moderate", status: "On Track" },
                  ].map((client, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{client.name}</td>
                      <td className="py-3 px-4">{client.value}</td>
                      <td className={`py-3 px-4 font-semibold ${client.return.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {client.return}
                      </td>
                      <td className="py-3 px-4">{client.risk}</td>
                      <td className="py-3 px-4">
                        <Badge variant={client.status === "On Track" ? "outline" : client.status === "Excellent" ? "default" : "destructive"}>
                          {client.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
