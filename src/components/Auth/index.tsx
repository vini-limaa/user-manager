import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import { Loading } from "@/components";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { authState, isLoggedIn, autoLogin } = useAuth();
  const { isAuthenticated, isLoading } = authState;

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
      return;
    }
    autoLogin();
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
