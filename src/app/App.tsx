import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Route, Switch } from "wouter";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import LandingPage from "./pages/LandingPage";
const loadComplianceDashboard = () => import("./pages/ComplianceDashboard");
const ComplianceDashboard = lazy(loadComplianceDashboard);
const loadAMLAlerts = () => import("./pages/AMLAlerts");
const AMLAlerts = lazy(loadAMLAlerts);
const loadEntityGraph = () => import("./pages/EntityGraph");
const EntityGraph = lazy(loadEntityGraph);
const loadKycOnboarding = () => import("./pages/KycOnboarding");
const KycOnboarding = lazy(loadKycOnboarding);
const loadSanctionsScreening = () => import("./pages/SanctionsScreening");
const SanctionsScreening = lazy(loadSanctionsScreening);
const loadSARGenerator = () => import("./pages/SARGenerator");
const SARGenerator = lazy(loadSARGenerator);
const loadFinancialAdvisory = () => import("./pages/FinancialAdvisory");
const FinancialAdvisory = lazy(loadFinancialAdvisory);
const loadOpenBanking = () => import("./pages/OpenBanking");
const OpenBanking = lazy(loadOpenBanking);
const loadAuditTrail = () => import("./pages/AuditTrail");
const AuditTrail = lazy(loadAuditTrail);
const loadSystemHealth = () => import("./pages/SystemHealth");
const SystemHealth = lazy(loadSystemHealth);
const loadCaseManagement = () => import("./pages/CaseManagement");
const CaseManagement = lazy(loadCaseManagement);
const loadSupervisorQueue = () => import("./pages/SupervisorQueue");
const SupervisorQueue = lazy(loadSupervisorQueue);
const loadRulesEngine = () => import("./pages/RulesEngine");
const RulesEngine = lazy(loadRulesEngine);
const loadRiskProfile = () => import("./pages/RiskProfile");
const RiskProfile = lazy(loadRiskProfile);
const loadWatchlistScreening = () => import("./pages/WatchlistScreening");
const WatchlistScreening = lazy(loadWatchlistScreening);
const loadUboDiscovery = () => import("./pages/UboDiscovery");
const UboDiscovery = lazy(loadUboDiscovery);
const loadRegulatoryReporting = () => import("./pages/RegulatoryReporting");
const RegulatoryReporting = lazy(loadRegulatoryReporting);
const loadAgentInvestigator = () => import("./pages/AgentInvestigator");
const AgentInvestigator = lazy(loadAgentInvestigator);
const loadCryptoForensics = () => import("./pages/CryptoForensics");
const CryptoForensics = lazy(loadCryptoForensics);
const loadFederatedLearning = () => import("./pages/FederatedLearning");
const FederatedLearning = lazy(loadFederatedLearning);
const loadDeepfakeDetection = () => import("./pages/DeepfakeDetection");
const DeepfakeDetection = lazy(loadDeepfakeDetection);
const loadCommHub = () => import("./pages/CommHub");
const CommHub = lazy(loadCommHub);
const loadWorkflowBuilder = () => import("./pages/WorkflowBuilder");
const WorkflowBuilder = lazy(loadWorkflowBuilder);
const loadMakerChecker = () => import("./pages/MakerChecker");
const MakerChecker = lazy(loadMakerChecker);
const loadProductTour = () => import("./pages/ProductTour");
const ProductTour = lazy(loadProductTour);

const prefetchers = [
  loadComplianceDashboard,
  loadAMLAlerts,
  loadEntityGraph,
  loadKycOnboarding,
  loadSanctionsScreening,
  loadSARGenerator,
  loadFinancialAdvisory,
  loadOpenBanking,
  loadAuditTrail,
  loadSystemHealth,
  loadCaseManagement,
  loadSupervisorQueue,
  loadRulesEngine,
  loadRiskProfile,
  loadWatchlistScreening,
  loadUboDiscovery,
  loadRegulatoryReporting,
  loadAgentInvestigator,
  loadCryptoForensics,
  loadFederatedLearning,
  loadDeepfakeDetection,
  loadCommHub,
  loadWorkflowBuilder,
  loadMakerChecker,
  loadProductTour,
];

export default function App() {
  useEffect(() => {
    const run = () => prefetchers.forEach((load) => load().catch(() => {}));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else setTimeout(run, 2000);
  }, []);

  return (
    <>
      <RouteErrorBoundary>
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
      </RouteErrorBoundary>
      <Toaster />
    </>
  );
}
