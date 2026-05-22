import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Calendar, User, MapPin, DollarSign } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function AlertDetail() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: alertDetail, isLoading: alertLoading } = trpc.aml.getAlertDetail.useQuery({ alertId: 1 });
  const alert = alertDetail?.alert;

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  if (user.role !== "compliance_officer") {
    navigate("/compliance");
    return null;
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    if (score >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/compliance")}>
              ← Back
            </Button>
            <h1 className="text-3xl font-bold">Alert Investigation</h1>
          </div>
          <p className="text-muted-foreground">Review and analyze suspicious activity</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {alertLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : alert ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Alert Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Alert Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        {alert.alertType}
                      </CardTitle>
                      <CardDescription>Alert ID: {alert.id}</CardDescription>
                    </div>
                    <Badge className={getRiskColor(Number(alert.riskScore))}>{alert.riskScore}% Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{alert.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(alert.createdAt as any).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Details</CardTitle>
                  <CardDescription>Associated transaction information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Amount</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <p className="text-lg font-semibold">$5,250.00</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Merchant</p>
                        <p className="font-semibold">International Wire Transfer</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Category</p>
                        <p className="font-semibold">Wire Transfer</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Destination</p>
                        <p className="font-semibold">Unknown Jurisdiction</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Analysis</CardTitle>
                  <CardDescription>Machine learning insights and pattern detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold mb-1">Pattern Match</p>
                      <p className="text-muted-foreground">Transaction amount exceeds user's typical spending by 340%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold mb-1">Behavioral Anomaly</p>
                      <p className="text-muted-foreground">First international transfer to this jurisdiction in account history</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold mb-1">Risk Factors</p>
                      <p className="text-muted-foreground">High-risk jurisdiction, unusual timing (3:47 AM), no prior notification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investigation Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Investigation Notes</CardTitle>
                  <CardDescription>Add notes and findings to this investigation</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    placeholder="Document your investigation findings, contact attempts, and conclusions..."
                    className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={5}
                  />
                  <Button className="mt-4">Save Notes</Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Actions */}
            <div className="space-y-4">
              {/* User Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">User Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-semibold text-sm">John Smith</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Account Age</p>
                    <p className="font-semibold text-sm">3 years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Account Status</p>
                    <Badge variant="outline">Good Standing</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Previous Alerts</p>
                    <p className="font-semibold text-sm">2</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    Contact User
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    Block Transaction
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    Freeze Account
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    Generate SAR
                  </Button>
                </CardContent>
              </Card>

              {/* Resolution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resolution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    Mark as Legitimate
                  </Button>
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                    Escalate to SAR
                  </Button>
                  <Button className="w-full variant-outline" size="sm">
                    Defer Decision
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>Alert not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
