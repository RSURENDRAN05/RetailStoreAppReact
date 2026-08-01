import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineReceiptTax,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog,
  HiX,
} from "react-icons/hi";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
  { to: "/customers", label: "Customers", icon: HiOutlineUsers },
  { to: "/products", label: "Products", icon: HiOutlineCube },
  { to: "/billing", label: "Billing", icon: HiOutlineReceiptTax },
  { to: "/bill-history", label: "Bill History", icon: HiOutlineDocumentText },
  { to: "/reports", label: "Reports", icon: HiOutlineChartBar },
  { to: "/settings", label: "Settings", icon: HiOutlineCog },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-lg shadow-lg shadow-brand-500/30">
          🏪
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-white">
            Store Billing
          </p>
          <p className="text-xs leading-tight text-slate-400">
            Management System
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-600/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-3 rounded-xl bg-white/5 px-4 py-3">
        <p className="text-xs text-slate-400">© 2026 Store Billing System</p>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop: fixed column (content pane offsets itself via lg:pl-64) */}
      <aside className="fixed z-40 hidden h-screen w-64 border-r border-white/5 bg-gradient-to-b from-slate-900 to-slate-950 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile / tablet: slide-in drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="animate-overlay-in absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="animate-sheet-in absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-3 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <HiX className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={onClose} />
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
