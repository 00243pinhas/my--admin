// utils/listingsStats.js
import dayjs from "dayjs";

export function buildListingsStatusTimeline(listings, days = 14) {
  if (!Array.isArray(listings)) {
    console.warn("buildListingsStatusTimeline expected array, got:", listings);
    return [];
  }

  const today = dayjs().startOf("day");
  const timeline = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = today.subtract(i, "day");

    const dayListings = listings.filter((l) =>
      dayjs(l.createdAt).isSame(date, "day")
    );

    timeline.push({
      date: date.format("MMM D"),
      active: dayListings.filter((l) => l.status === "active").length,
      pending: dayListings.filter((l) => l.status === "pending").length,
      rejected: dayListings.filter(
        (l) => l.status === "rejected" || l.status === "archived"
      ).length,
    });
  }

  return timeline;
}

