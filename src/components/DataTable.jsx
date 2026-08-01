/**
 * columns: [{ key, header, cell(row), className }]
 * rows: array of objects, each needs a unique `id`
 */
function DataTable({ columns, rows, emptyMessage = "No records found" }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Table view: sm and up */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200/70 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="text-slate-700 transition-colors hover:bg-brand-50/50 dark:text-slate-300 dark:hover:bg-slate-800/40"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 align-middle ${col.className ?? ""}`}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked card view: below sm */}
      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-start justify-between gap-3 py-1.5 first:pt-0 last:pb-0"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {col.header}
                </span>
                <span className="text-right text-sm text-slate-700 dark:text-slate-300">
                  {col.cell(row)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default DataTable;
