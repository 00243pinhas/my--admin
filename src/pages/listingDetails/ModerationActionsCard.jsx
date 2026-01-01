export default function ModerationActionsCard() {
  return (
    <div className="card border-danger">
      <div className="card-header bg-light">
        <h6 className="mb-0 text-danger">Moderation Actions</h6>
      </div>

      <div className="card-body d-flex gap-2 flex-wrap">
        <button className="btn btn-success">Approve</button>
        <button className="btn btn-outline-danger">Reject</button>
        <button className="btn btn-outline-secondary">Archive</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
