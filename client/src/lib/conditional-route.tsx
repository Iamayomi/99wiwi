// src/lib/conditional-route.tsx
import { useAuth } from "@/hooks/use-auth";
import { Route } from "wouter";

interface ConditionalRouteProps {
  path: string;
  loggedInComponent: React.ComponentType;
  loggedOutComponent: React.ComponentType;
}

export const ConditionalRoute = ({
  path,
  loggedInComponent: LoggedIn,
  loggedOutComponent: LoggedOut,
}: ConditionalRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route path={path} component={isAuthenticated ? LoggedIn : LoggedOut} />
  );
};
