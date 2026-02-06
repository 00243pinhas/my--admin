// utils/listingsStats.js
import dayjs from "dayjs";

export function buildListingsStatusTimeline(listings, days = 14) {
  if (!Array.isArray(listings) || listings.length === 0) return [];

  const today = dayjs().startOf("day");

  const bucket = {};

  for (const l of listings) {
    if (!l.createdAt) continue;

    const key = dayjs(l.createdAt).format("YYYY-MM-DD");
    if (!bucket[key]) {
      bucket[key] = { active: 0, pending: 0, rejected: 0 };
    }

    if (l.status === "active") bucket[key].active++;
    else if (l.status === "pending") bucket[key].pending++;
    else if (l.status === "rejected" || l.status === "archived")
      bucket[key].rejected++;
  }

  const timeline = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = today.subtract(i, "day");
    const key = date.format("YYYY-MM-DD");

    timeline.push({
      date: date.format("MMM D"),
      active: bucket[key]?.active || 0,
      pending: bucket[key]?.pending || 0,
      rejected: bucket[key]?.rejected || 0,
    });
  }

  return timeline;
}
