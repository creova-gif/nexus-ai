import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
const ComplianceDashboard = lazy(() => import("./pages/ComplianceDashboard"));
const AMLAlerts = lazy(() => import("./pages/AMLAlerts"));
const EntityGraph = lazy(() => import("./pages/EntityGraph"));
const KycOnboarding = lazy(() => import("./pages/KycOnboarding"));
const SanctionsScreening = lazy(() => import("./pages/SanctionsScreening"));
const SARGenerator = lazy(() => import("./pages/SARGenerator"));
const FinancialAdvisory = lazy(() => import("./pages/FinancialAdvisory"));
const OpenBanking = lazy(() => import("./pages/OpenBanking"));
const AuditTrail = lazy(() => import("./pages/AuditTrail"));
const SystemHealth = lazy(() => import("./pages/SystemHealth"));
const CaseManagement = lazy(() => import("./pages/CaseManagement"));
const SupervisorQueue = lazy(() => import("./pages/SupervisorQueue"));
const RulesEngine = lazy(() => import("./pages/RulesEngine"));
const RiskProfile = lazy(() => import("./pages/RiskProfile"));
const WatchlistScreening = lazy(() => import("./pages/WatchlistScreening"));
const UboDiscovery = lazy(() => import("./pages/UboDiscovery"));
const RegulatoryReporting = lazy(() => import("./pages/RegulatoryReporting"));
const AgentInvestigator = lazy(() => import("./pages/AgentInvestigator"));
const CryptoForensics = lazy(() => import("./pages/CryptoForensics"));
const FederatedLearning = lazy(() => import("./pages/FederatedLearning"));
const DeepfakeDetection = lazy(() => import("./pages/DeepfakeDetection"));
const CommHub = lazy(() => import("./pages/CommHub"));
const WorkflowBuilder = lazy(() => import("./pages/WorkflowBuilder"));
const MakerChecker = lazy(() => import("./pages/MakerChecker"));
const ProductTour = lazy(() => import("./pages/ProductTour"));

export default function App() {
  return (
    <>
      <Suspense
        fallback={
          <div role="status" className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
            <span className="text-[var(--text-purple-2)]">Loading…</span>
          </div>
        }
      >
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/tour" component={ProductTour} />
        <Route path="/dashboard" component={ComplianceDashboard} />
        <Route path="/compliance" component={ComplianceDashboard} />
        <Route path="/alerts" component={AMLAlerts} />
        <Route path="/network" component={EntityGraph} />
        <Route path="/kyc" component={KycOnboarding} />
        <Route path="/sanctions" component={SanctionsScreening} />
        <Route path="/sar" component={SARGenerator} />
        <Route path="/advisory" component={FinancialAdvisory} />
        <Route path="/openbanking" component={OpenBanking} />
        <Route path="/audit" component={AuditTrail} />
        <Route path="/admin" component={SystemHealth} />
        <Route path="/cases" component={CaseManagement} />
        <Route path="/supervisor" component={SupervisorQueue} />
        <Route path="/rules" component={RulesEngine} />
        <Route path="/risk-profile" component={RiskProfile} />
        <Route path="/screening" component={WatchlistScreening} />
        <Route path="/ubo" component={UboDiscovery} />
        <Route path="/reporting" component={RegulatoryReporting} />
        <Route path="/agent" component={AgentInvestigator} />
        <Route path="/crypto-graph" component={CryptoForensics} />
        <Route path="/federated" component={FederatedLearning} />
        <Route path="/deepfake" component={DeepfakeDetection} />
        <Route path="/comms" component={CommHub} />
        <Route path="/workflow-builder" component={WorkflowBuilder} />
        <Route path="/qa-checker" component={MakerChecker} />
        <Route>
          {() => (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-white font-['Instrument_Serif']">404</h1>
                <p className="text-[var(--text-purple-2)]">Page not found</p>
              </div>
            </div>
          )}
        </Route>
      </Switch>
      </Suspense>
      <Toaster />
    </>
  );
}
