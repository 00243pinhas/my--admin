export default function BaseListingCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Base Listing</h6>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-8">
            <h5>Listing Title</h5>
            <p className="text-muted mb-0">
              Listing description goes here. This is the primary content that
              describes what the listing is about.
            </p>
          </div>

          <div className="col-md-4">
            <ul className="list-unstyled small mb-0">
              <li><strong>Price:</strong> $120,000</li>
              <li><strong>Location:</strong> Berlin, Germany</li>
              <li><strong>Listing Type:</strong> Real Estate</li>
              <li><strong>Created:</strong> 2025-01-12</li>
              <li><strong>Updated:</strong> 2025-01-18</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
