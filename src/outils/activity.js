function safeDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
}

function pickUserDisplay(u) {
  const name = [u?.firstName, u?.lastName].filter(Boolean).join(" ").trim();
  return (
    name ||
    u?.email ||
    u?.phoneNumber ||
    (u?.id ? `User ${String(u.id).slice(0, 6)}…` : "User")
  );
}

function pickListingTypeName(l) {
  return l?.listingType?.name || l?.listingType?.code || "Listing";
}

// function normalizeTypeCode(code) {
//   // supports both real_estate and real-estate
//   return String(code || "").replaceAll("_", "-").toLowerCase();
// }

export function buildRecentActivity({
  listings = [],
  users = [],
  subscriptions = [],
  now = Date.now(),
  hours = 24,      // ✅ default “1 day ago”
  limit = 8,
} = {}) {
  const activity = [];
  const cutoff = now - hours * 60 * 60 * 1000;

  // -------------------------
  // USERS (registered recently)
  // users use memberSince
  // -------------------------
  for (const u of users) {
    const ts = safeDate(u?.memberSince || u?.createdAt || u?.created_at);
    if (!ts) continue;
    if (ts.getTime() < cutoff) continue;

    const who = pickUserDisplay(u);

    activity.push({
      id: `user-${u.id}`,
      kind: "user",
      timestamp: ts,
      label: `New user registered — ${who}`,
      href: u?.id ? `/dashboard/users/${u.id}` : null,
    });
  }

  // -------------------------
  // LISTINGS
  // - created
  // - approved/rejected (based on updatedAt + status)
  // -------------------------
  for (const l of listings) {
    const typeName = pickListingTypeName(l);
    const title = l?.title || "Untitled";

    // created
    const created = safeDate(l?.createdAt || l?.created_at);
    if (created && created.getTime() >= cutoff) {
      activity.push({
        id: `listing-created-${l.id}`,
        kind: "listing",
        timestamp: created,
        label: `New listing created — ${title} (${typeName})`,
        href: l?.id ? `/dashboard/listings/${l.id}` : null,
      });
    }

    // status change (approved/rejected/archived) — only if updated recently
    const updated = safeDate(l?.updatedAt || l?.updated_at);
    const status = String(l?.status || "").toLowerCase();

    if (updated && updated.getTime() >= cutoff) {
      if (status === "active") {
        activity.push({
          id: `listing-approved-${l.id}`,
          kind: "listing",
          timestamp: updated,
          label: `Listing approved — ${title} (${typeName})`,
          href: l?.id ? `/dashboard/listings/${l.id}` : null,
        });
      } else if (status === "rejected") {
        activity.push({
          id: `listing-rejected-${l.id}`,
          kind: "listing",
          timestamp: updated,
          label: `Listing rejected — ${title} (${typeName})`,
          href: l?.id ? `/dashboard/listings/${l.id}` : null,
        });
      } else if (status === "archived") {
        activity.push({
          id: `listing-archived-${l.id}`,
          kind: "listing",
          timestamp: updated,
          label: `Listing archived — ${title} (${typeName})`,
          href: l?.id ? `/dashboard/listings/${l.id}` : null,
        });
      }
    }
  }

  // -------------------------
  // SUBSCRIPTIONS
  // createdAt is present
  // -------------------------
  for (const s of subscriptions) {
    const ts = safeDate(s?.createdAt || s?.created_at || s?.startsAt);
    if (!ts) continue;
    if (ts.getTime() < cutoff) continue;

    const planName = s?.subscriptionPlan?.name || "Plan";
    const status = String(s?.status || "").toLowerCase();
    const userId = s?.userId;

    const statusLabel =
      status === "active" ? "activated" :
      status === "canceled" ? "canceled" :
      status === "expired" ? "expired" :
      "updated";

    activity.push({
      id: `subscription-${s.id}`,
      kind: "subscription",
      timestamp: ts,
      label: `Subscription ${statusLabel} — ${planName} (${userId ? String(userId).slice(0, 6) + "…" : "user"})`,
      href: userId ? `/dashboard/users/${userId}` : null,
    });
  }

  // -------------------------
  // Sort + dedupe + limit
  // -------------------------
  const seen = new Set();
  return activity
    .filter((e) => {
      if (!e?.id || seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}
