const compactFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return `₹${compactFormatter.format(value)}`;
}
