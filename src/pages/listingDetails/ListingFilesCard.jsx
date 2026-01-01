export default function ListingFilesCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Files & Media</h6>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-3">
            <div className="border rounded p-2 text-center small">
              Image Preview
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded p-2 text-center small">
              Document.pdf
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
