export default function ListingFilesCard({ files = [] }) {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Files & Media</h6>
      </div>

      <div className="card-body">
        {files.length === 0 ? (
          <div className="text-muted small">
            No files attached to this listing.
          </div>
        ) : (
          <div className="row g-3">
            {files.map((file) => (
              <div key={file.id} className="col-md-3">
                <div className="border rounded p-2 small text-center">
                  {file.mimeType?.startsWith("image/")
                    ? "Image"
                    : "Document"}
                  <div className="mt-1 text-muted">
                    {file.originalName || "File"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
