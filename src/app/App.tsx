import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import { PWAInstallPrompt } from "./components/pwa-install-prompt";
import { OfflineIndicator } from "./components/offline-indicator";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <PWAInstallPrompt />
      <OfflineIndicator />
    </ThemeProvider>
  );
}