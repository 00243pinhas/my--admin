// function isPrimitive(v) {
//   return v === null || ["string", "number", "boolean"].includes(typeof v);
// }

// function formatKey(key) {
//   return String(key)
//     .replace(/_/g, " ")
//     .replace(/([a-z])([A-Z])/g, "$1 $2")
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

// function renderValue(value) {
//   if (isPrimitive(value)) return String(value ?? "—");
//   if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
//   return "[object]";
// }

export default function TypeDetailsRenderer({ listing }) {
  const type = listing?.listingType;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Type-Specific Details</h6>
        <span className="badge bg-light text-dark">
          {type?.name || "Unknown"}
        </span>
      </div>

      <div className="card-body text-muted">
        No type-specific details are available for this listing yet.
        <br />
        <small>
          This listing is categorized as <strong>{type?.name}</strong>, but
          no subtype or structured details were provided.
        </small>
      </div>
    </div>
  );
}

