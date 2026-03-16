import { Outlet } from "react-router";
import { Sidebar } from "./sidebar";

export function Layout() {
  return (
    <div
      className="h-screen w-full flex bg-[var(--s1)] overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
