import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import alfredLogo from "../assets/alfred-logo";

const loadingSteps = [
  { label: "Connecting to your workspace", delay: 0 },
  { label: "Syncing calendar & messages", delay: 800 },
  { label: "Loading your preferences", delay: 1800 },
  { label: "Almost ready", delay: 2600 },
];

export function LaunchScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const duration = 3400;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    loadingSteps.forEach((step, i) => {
      setTimeout(() => setCurrentStep(i), step.delay + 300);
    });

    const navTimeout = setTimeout(() => {
      const hasOnboarded = localStorage.getItem("alfred-onboarded");
      if (hasOnboarded) {
        navigate("/app", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    }, 3800);

    return () => clearTimeout(navTimeout);
  }, [navigate]);

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-[var(--s1)]"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <img
          src={alfredLogo}
          alt="Alfred"
          className="w-24 h-24 rounded-[22px] object-contain bg-black p-2"
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
        <div className="text-center">
          <h1 className="text-[22px] text-[var(--t1)]" style={{ fontWeight: 600 }}>
            Alfred
          </h1>
          <p className="text-[13px] text-[var(--t3)] mt-1">
            AI Personal Assistant
          </p>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-10 w-[240px] flex flex-col items-center gap-3"
      >
        <div className="w-full h-[3px] rounded-full bg-[var(--s3)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[var(--ind)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[12px] text-[var(--t3)] transition-all duration-300">
          {loadingSteps[currentStep]?.label}
        </p>
      </motion.div>
    </div>
  );
}