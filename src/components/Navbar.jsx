import { HiMenu, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

function Navbar({ title, onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 shadow-sm shadow-slate-200/40 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      <h1 className="flex-1 truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
        {title}
      </h1>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {theme === "dark" ? (
          <HiOutlineSun className="h-5 w-5" />
        ) : (
          <HiOutlineMoon className="h-5 w-5" />
        )}
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white shadow-md shadow-brand-500/30 ring-2 ring-white dark:ring-slate-900">
        A
      </div>
    </header>
  );
}

export default Navbar;
