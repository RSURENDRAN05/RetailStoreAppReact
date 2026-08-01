import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Soft decorative glow — purely visual, sits behind content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden"
        >
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-700/10" />
          <div className="absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-700/10" />
        </div>

        <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="relative flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
