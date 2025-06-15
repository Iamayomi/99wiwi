import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { BanNotification } from "@/components/ban-notification";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import DashboardPage from "@/pages/dashboard-page";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth-page";
import SlotsPage from "@/pages/slots-page";
import DicePage from "@/pages/dice-page";
import CrashPage from "@/pages/crash-page";
import RoulettePage from "@/pages/roulette-page";
import BlackjackPage from "@/pages/blackjack-page";
import PlinkoPage from "@/pages/plinko-page";
import AdminPage from "@/pages/admin-page";
import HistoryPage from "@/pages/history-page";
import PurchasePage from "@/pages/purchase-page";
import RewardsPage from "@/pages/rewards-page";
import SubscriptionPage from "@/pages/subscription-page";
import SupportPage from "@/pages/support-page";
import PrivacyPolicyPage from "@/pages/privacy-policy-page";
import TermsOfServicePage from "@/pages/terms-of-service-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import ResetPasswordPage from "@/pages/reset-password-page";
import { ProtectedRoute } from "./lib/protected-route";
import { ConditionalRoute } from "./lib/conditional-route";
import Leaderboard from "./components/HeroPage/leaderboard";
import AboutUsPage from "./pages/about-us";
import CookiePolicyPage from "./pages/cookie-policy";
import HowToBetPage from "./pages/howToBet";
import ContactUsPage from "./pages/contact-us";
import ProfilePage from "./pages/profilePage";

function Router() {
  return (
    <Switch>
      <ConditionalRoute
        path="/"
        loggedInComponent={DashboardPage}
        loggedOutComponent={Home}
      />
      <ProtectedRoute path="/slots" component={SlotsPage} />
      <ProtectedRoute path="/dice" component={DicePage} />
      <ProtectedRoute path="/crash" component={CrashPage} />
      <ProtectedRoute path="/roulette" component={RoulettePage} />
      <ProtectedRoute path="/blackjack" component={BlackjackPage} />
      <ProtectedRoute path="/plinko" component={PlinkoPage} />
      <ProtectedRoute path="/history" component={HistoryPage} />
      <ProtectedRoute path="/purchase" component={PurchasePage} />
      <ProtectedRoute path="/rewards" component={RewardsPage} />
      <ProtectedRoute path="/subscriptions" component={SubscriptionPage} />
      <ProtectedRoute path="/support" component={SupportPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <ProtectedRoute path="/admins" component={AdminPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/howToBet" component={HowToBetPage} />
      <Route path="/contact-us" component={ContactUsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <BanNotification />
          <Router />
          {/* <Footer /> */}

          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
