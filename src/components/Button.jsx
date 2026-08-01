const VARIANTS = {
  primary:
    "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/30 hover:shadow-lg hover:shadow-brand-500/40 hover:from-brand-600 hover:to-brand-700 focus-visible:outline-brand-600",
  success:
    "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-emerald-700 focus-visible:outline-emerald-600",
  danger:
    "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 hover:from-red-600 hover:to-red-700 focus-visible:outline-red-600",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
};

function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
