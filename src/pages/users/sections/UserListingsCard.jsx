export default function UserListingsCard({ listings }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>User Listings</strong>
      </div>
      <div className="card-body p-0">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td>
                  <a
                    href={`/dashboard/listings/${l.id}`}
                    className="text-decoration-none"
                  >
                    {l.title}
                  </a>
                </td>

                <td>
                  <span className="badge bg-secondary">
                    {l.status}
                  
                  </span>
                </td>
              </tr>
            ))}

            {listings.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-muted py-3">
                  No listings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
