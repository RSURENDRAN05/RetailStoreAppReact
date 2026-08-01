function Card({ title, icon, actions, className = "", children }) {
  const hasHeader = title || actions;

  return (
    <div
      className={`rounded-2xl border border-slate-200/70 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className}`}
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            {icon && (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-base dark:bg-brand-950">
                {icon}
              </span>
            )}
            {title && (
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

const ACCENTS = {
  brand: {
    icon: "bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-500/30",
    glow: "group-hover:shadow-brand-500/20",
  },
  emerald: {
    icon: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
    glow: "group-hover:shadow-emerald-500/20",
  },
  amber: {
    icon: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30",
    glow: "group-hover:shadow-amber-500/20",
  },
  rose: {
    icon: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/30",
    glow: "group-hover:shadow-rose-500/20",
  },
};

export function StatCard({ label, value, icon, accent = "brand" }) {
  const tone = ACCENTS[accent];

  return (
    <div
      className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm shadow-slate-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-black/20 ${tone.glow}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl text-white shadow-lg sm:h-14 sm:w-14 sm:text-2xl ${tone.icon}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default Card;
