export default function TypeDetailsRenderer() {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Type-Specific Details</h6>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-4">
            <strong>Bedrooms</strong>
            <div className="text-muted">3</div>
          </div>

          <div className="col-md-4">
            <strong>Bathrooms</strong>
            <div className="text-muted">2</div>
          </div>

          <div className="col-md-4">
            <strong>Area</strong>
            <div className="text-muted">120 m²</div>
          </div>

        </div>
      </div>
    </div>
  );
}
