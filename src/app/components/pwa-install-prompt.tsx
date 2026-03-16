import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Monitor, Smartphone, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return { isInstallable, isInstalled, install };
}

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Check localStorage for dismissal
  useEffect(() => {
    const wasDismissed = localStorage.getItem("alfred-pwa-dismissed");
    if (wasDismissed) {
      setDismissed(true);
    }
  }, []);

  // Delay showing the banner so it doesn't appear immediately
  useEffect(() => {
    if (isInstallable && !dismissed && !isInstalled) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, dismissed, isInstalled]);

  const handleDismiss = () => {
    setDismissed(true);
    setShowBanner(false);
    localStorage.setItem("alfred-pwa-dismissed", "true");
  };

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 2000);
    }
  };

  const visible = showBanner && !dismissed && !isInstalled;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-[100] max-w-[340px] w-full"
        >
          <div
            className="rounded-xl border border-[var(--b1)] bg-[var(--s1)] p-4 shadow-2xl"
            style={{
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1)",
            }}
          >
            {showSuccess ? (
              <div className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p
                    className="text-[14px] text-[var(--t1)]"
                    style={{ fontWeight: 600 }}
                  >
                    Alfred installed!
                  </p>
                  <p className="text-[12px] text-[var(--t3)] mt-0.5">
                    Find it in your applications.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--ind)]/10 flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5 text-[var(--ind)]" />
                    </div>
                    <div>
                      <p
                        className="text-[14px] text-[var(--t1)]"
                        style={{ fontWeight: 600 }}
                      >
                        Install Alfred
                      </p>
                      <p className="text-[12px] text-[var(--t3)] mt-0.5">
                        Run as a desktop app
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="p-1 rounded-lg hover:bg-[var(--s3)] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-[var(--t3)]" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--t3)]">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </div>
                  <div className="w-px h-3 bg-[var(--b1)]" />
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--t3)]">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </div>
                  <div className="w-px h-3 bg-[var(--b1)]" />
                  <span className="text-[11px] text-[var(--t3)]">
                    Works offline
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 h-9 rounded-lg border border-[var(--b1)] text-[13px] text-[var(--t2)] hover:bg-[var(--s3)] transition-colors cursor-pointer"
                    style={{ fontWeight: 500 }}
                  >
                    Not now
                  </button>
                  <button
                    onClick={handleInstall}
                    className="flex-1 h-9 rounded-lg bg-[var(--ind)] text-[13px] text-white hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
                    style={{ fontWeight: 500 }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Install
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Compact install button for the Settings page */
export function PWAInstallButton() {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [installing, setInstalling] = useState(false);

  const handleClick = async () => {
    setInstalling(true);
    const success = await install();
    if (!success) setInstalling(false);
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
        <Check className="w-4 h-4 text-green-500" />
        <span
          className="text-[13px] text-green-600 dark:text-green-400"
          style={{ fontWeight: 500 }}
        >
          Alfred is installed as a desktop app
        </span>
      </div>
    );
  }

  if (!isInstallable) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--s3)] border border-[var(--b1)]">
        <Monitor className="w-4 h-4 text-[var(--t3)]" />
        <span className="text-[13px] text-[var(--t3)]" style={{ fontWeight: 500 }}>
          Open in Chrome or Edge to install as a desktop app
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={installing}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--ind)] text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
      style={{ fontWeight: 500 }}
    >
      <Download className="w-4 h-4" />
      <span className="text-[13px]">
        {installing ? "Installing..." : "Install Alfred as Desktop App"}
      </span>
    </button>
  );
}
