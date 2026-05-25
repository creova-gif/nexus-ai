import { Toaster } from "./components/ui/sonner";
import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import ComplianceDashboard from "./pages/ComplianceDashboard";
import KycOnboarding from "./pages/KycOnboarding";
import CaseManagement from "./pages/CaseManagement";
import SupervisorQueue from "./pages/SupervisorQueue";
import RulesEngine from "./pages/RulesEngine";
import EntityGraph from "./pages/EntityGraph";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/dashboard" component={ComplianceDashboard} />
        <Route path="/compliance" component={ComplianceDashboard} />
        <Route path="/kyc" component={KycOnboarding} />
        <Route path="/cases" component={CaseManagement} />
        <Route path="/supervisor" component={SupervisorQueue} />
        <Route path="/rules" component={RulesEngine} />
        <Route path="/network" component={EntityGraph} />
        <Route>
          {() => (
            <div className="min-h-screen flex items-center justify-center bg-[var(--navy-bg)]">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>404</h1>
                <p style={{ color: "var(--navy-text2)" }}>Page not found</p>
              </div>
            </div>
          )}
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}
