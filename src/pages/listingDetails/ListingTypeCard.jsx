export default function ListingTypeCard({ listing }) {
  const type = listing.listingType;

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Listing Classification</h6>
      </div>

      <div className="card-body">
        <div className="text-muted">
          {type?.name || "Unknown"}
          {type?.category && ` → ${type.category}`}
          {type?.subType && ` → ${type.subType}`}
        </div>
      </div>
    </div>
  );
}
