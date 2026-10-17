import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import Arsenal from "@/pages/Arsenal";
import Operations from "@/pages/Operations";
import Comms from "@/pages/Comms";
import { Intelligence } from "@/pages/Intelligence";
import Doctrine from "@/pages/Doctrine";
import ProjectDetail from "@/pages/ProjectDetail";
import { CyberShell } from "./components/layout/CyberShell";
import { VaultProvider } from "./contexts/VaultContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/arsenal">
        {() => (
          <CyberShell>
            <Arsenal />
          </CyberShell>
        )}
      </Route>
      <Route path="/operations">
        {() => (
          <CyberShell>
            <Operations />
          </CyberShell>
        )}
      </Route>
      <Route path="/intelligence">
        {() => (
          <CyberShell>
            <Intelligence />
          </CyberShell>
        )}
      </Route>
      <Route path="/doctrine">
        {() => (
          <CyberShell>
            <Doctrine />
          </CyberShell>
        )}
      </Route>
      <Route path="/operations/:projectId">
        {() => (
          <CyberShell>
            <ProjectDetail />
          </CyberShell>
        )}
      </Route>
      <Route path="/comms">
        {() => (
          <CyberShell>
            <Comms />
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
