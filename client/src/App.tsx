import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import { CyberShell } from "./components/layout/CyberShell";
import { VaultProvider } from "./contexts/VaultContext";

const Arsenal = lazy(() => import("@/pages/Arsenal"));
const Operations = lazy(() => import("@/pages/Operations"));
const Comms = lazy(() => import("@/pages/Comms"));
const Intelligence = lazy(() => import("@/pages/Intelligence").then((m) => ({ default: m.Intelligence })));
const Doctrine = lazy(() => import("@/pages/Doctrine"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

function CyberLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-neon-blue font-mono text-xs">
      <div className="w-10 h-10 border-2 border-neon-blue/20 border-t-neon-blue rounded-full animate-spin" />
      <span className="tracking-widest animate-pulse">DECRYPTING_TACTICAL_INTERFACE...</span>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/arsenal">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <Arsenal />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route path="/operations">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <Operations />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route path="/intelligence">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <Intelligence />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route path="/doctrine">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <Doctrine />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route path="/operations/:projectId">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <ProjectDetail />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route path="/comms">
        {() => (
          <CyberShell>
            <Suspense fallback={<CyberLoading />}>
              <Comms />
            </Suspense>
          </CyberShell>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <VaultProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </VaultProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
