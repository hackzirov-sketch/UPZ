import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { applyDir } from "@/i18n";
import { storage } from "@/utils/storage";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/not-found";
import OnboardingPage from "@/pages/OnboardingPage";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import WorkspacePage from "@/pages/WorkspacePage";
import ChatPage from "@/pages/ChatPage";
import TasksNotesPage from "@/pages/TasksNotesPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient();

function DirSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    applyDir(i18n.language);
  }, [i18n.language]);
  return null;
}

function handleLogout() {
  storage.clearOnboarded();
  window.location.href = "/";
}

function AppRoute({ component: Component }: { component: React.ComponentType<{ user: ReturnType<typeof storage.getUser> & object; onLogout: () => void }> }) {
  const user = storage.getUser();
  if (!user || !storage.isOnboarded()) {
    return <Redirect to="/onboarding" />;
  }
  return <Component user={user} onLogout={handleLogout} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/app/home">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <HomePage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/dashboard">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <DashboardPage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/workspace">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <WorkspacePage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/chat">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <ChatPage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/tasks">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <TasksNotesPage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/profile">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <ProfilePage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route path="/app/settings">
        {() => {
          const user = storage.getUser();
          if (!user || !storage.isOnboarded()) return <Redirect to="/onboarding" />;
          return <SettingsPage user={user} onLogout={handleLogout} />;
        }}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DirSync />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
