export function formatBudgetInr(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "₹ 0";

  if (/₹|inr|rs\.?/i.test(raw)) {
    return raw;
  }

  return `₹ ${raw}`;
}
