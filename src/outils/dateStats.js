export function countLastNDays(items, dateField, days = 7) {
  if (!Array.isArray(items)) return 0;

  const now = new Date();
  const from = new Date();
  from.setDate(now.getDate() - days);

  return items.filter((item) => {
    const raw = item?.[dateField];
    if (!raw) return false;

    const date = new Date(raw);
    return date >= from;
  }).length;
}
