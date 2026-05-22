import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import AIChat from "@/components/AIChat";
import CreateTicketModal from "@/components/CreateTicketModal";

export default function Support() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { data: tickets, isLoading: ticketsLoading, refetch } = trpc.support.getTickets.useQuery();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "waiting":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-orange-600";
      case "urgent":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Customer Support Center</h1>
          <p className="text-muted-foreground">Get help from our AI assistant or track your support tickets</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-600" />
                Total Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                Open
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === "open").length || 0}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-600" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === "in_progress").length || 0}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === "resolved").length || 0}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* AI Chat */}
          <div className="lg:col-span-1">
            <AIChat title="Support Assistant" placeholder="Describe your issue..." />
          </div>

          {/* Tickets List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
                <CardDescription>Track and manage your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                {ticketsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                ) : tickets && tickets.length > 0 ? (
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{ticket.subject}</p>
                              <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>{ticket.status}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{ticket.description}</p>
                          </div>
                          <span className={`text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">{ticket.ticketNumber}</span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No tickets yet</p>
                    <p className="text-xs mt-1">Create a ticket or chat with our AI assistant</p>
                    <Button onClick={() => setCreateModalOpen(true)} className="mt-4">
                      Create Your First Ticket
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  q: "How long does it take to get a response?",
                  a: "Our support team typically responds within 2-4 hours during business hours. Urgent issues are prioritized.",
                },
                {
                  q: "Can I update my financial goals?",
                  a: "Yes, you can update your goals anytime from the Customer Dashboard. Changes are reflected immediately.",
                },
                {
                  q: "How do I connect another bank account?",
                  a: "Go to the Open Banking section and click 'Connect Institution'. Follow the OAuth flow to authorize access.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, all data is encrypted in transit and at rest. We comply with Canadian banking regulations and PIPEDA.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-border pb-4 last:border-0">
                  <p className="font-semibold text-sm mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Create Ticket Modal */}
      <CreateTicketModal open={createModalOpen} onOpenChange={setCreateModalOpen} onSuccess={() => refetch()} />
    </div>
  );
}
