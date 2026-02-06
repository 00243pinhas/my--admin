

export default function TypeDetailsRenderer({ listing }) {
  const type = listing?.listingType;

  console.log("Rendering Type Details for:", type);

  return (
    <div className="card p-4">
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

