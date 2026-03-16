import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Root redirect — checks if onboarding has been completed.
 * If yes → go straight to /app. If no → go to /launch splash.
 */
export function AppRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("alfred-onboarded");
    if (hasOnboarded) {
      navigate("/app", { replace: true });
    } else {
      navigate("/launch", { replace: true });
    }
  }, [navigate]);

  // Brief blank screen while redirecting
  return (
    <div className="h-screen w-full bg-[var(--s1)]" />
  );
}
