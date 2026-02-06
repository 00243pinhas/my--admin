export default function ListingTypeCard({ listing }) {
  const type = listing.listingType;
  console.log("Listing Type:", type);

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Listing Classification</h6>
      </div>

      <div className="card-body">
        <div className="text-muted">
          {type?.name || "Unknown"}
          {type?.name && ` → ${type.name}`}
        </div>
      </div>
    </div>
  );
}
