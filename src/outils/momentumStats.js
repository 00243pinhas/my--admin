export function isWithinLastDays(dateStr, days = 7) {
  if (!dateStr) return false;

  const now = new Date();
  const from = new Date();
  from.setDate(now.getDate() - days);

  return new Date(dateStr) >= from;
}
