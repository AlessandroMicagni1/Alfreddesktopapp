import { createBrowserRouter } from "react-router";
import { AppRedirect } from "./components/app-redirect";
import { LaunchScreen } from "./components/launch-screen";
import { OnboardingScreen } from "./components/onboarding-screen";
import { Layout } from "./components/layout";
import { HomePage } from "./components/home-page";
import { ActionReviewPage } from "./components/action-review-page";
import { InboxPage } from "./components/inbox-page";
import { NotesPage } from "./components/notes-page";
import { FilesPage } from "./components/files-page";
import { SettingsPage } from "./components/settings-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppRedirect,
  },
  {
    path: "/launch",
    Component: LaunchScreen,
  },
  {
    path: "/onboarding",
    Component: OnboardingScreen,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "inbox", Component: InboxPage },
      { path: "notes", Component: NotesPage },
      { path: "files", Component: FilesPage },
      { path: "settings", Component: SettingsPage },
      { path: "review", Component: ActionReviewPage },
    ],
  },
]);
