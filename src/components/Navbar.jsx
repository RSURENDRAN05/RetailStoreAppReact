
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiMenu,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUserCircle,
  HiOutlineLogout,
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

function Navbar({ title, onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 shadow-sm shadow-slate-200/40 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none sm:px-6">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      {/* Page Title */}
      <h1 className="flex-1 truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
        {title}
      </h1>

      {/* Dark Mode */}
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {theme === "dark" ? (
          <HiOutlineSun className="h-5 w-5" />
        ) : (
          <HiOutlineMoon className="h-5 w-5" />
        )}
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-md"
        >
          <HiOutlineUserCircle className="h-7 w-7" />
        </button>        {open && (
          <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <HiOutlineUserCircle className="h-5 w-5" />
              My Profile
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
            >
              <HiOutlineLogout className="h-5 w-5" />
              Logout
            </button>

          </div>
        )}
      </div>

    </header>
  );
}

export default Navbar;