import ListingsFeedRow from "./ListingsFeedRow";
import "./listings-feed.css";
import Toast from "../../ components/Toast";
export default function ListingsFeedTable({
  loading,
  error,
  listings,
  onView,
  onApprove,
  onReject,
  onDelete,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
      <table className="table align-middle mb-0 listings-feed-table">
          <thead className="table-light">
            <tr>
              <th>Listing</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Loading listings…
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={6} className="text-center text-danger py-4">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && listings.map((l) => (
              <ListingsFeedRow
                key={l.id}
                listing={l}
                onView={onView}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
              />
            ))}

            {!loading && !error && listings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No listings found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
