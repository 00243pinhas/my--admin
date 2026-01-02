export default function BaseListingCard({ listing }) {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Base Listing</h6>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-8">
            <h5>{listing.title || "Untitled listing"}</h5>
            <p className="text-muted mb-0">
              {listing.description || "No description provided."}
            </p>
          </div>

          <div className="col-md-4">
            <ul className="list-unstyled small mb-0">
              <li>
                <strong>Price:</strong>{" "}
                {listing.price
                  ? `${listing.price} ${listing.currency || ""}`
                  : "—"}
              </li>
              <li>
                <strong>Location:</strong>{" "}
                {listing.city?.name || listing.location || "—"}
              </li>
              <li>
                <strong>Status:</strong> {listing.status}
              </li>
              <li>
                <strong>Created:</strong>{" "}
                {listing.createdAt
                  ? new Date(listing.createdAt).toLocaleDateString()
                  : "—"}
              </li>
              <li>
                <strong>Updated:</strong>{" "}
                {listing.updatedAt
                  ? new Date(listing.updatedAt).toLocaleDateString()
                  : "—"}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
