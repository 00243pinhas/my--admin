import { useNavigate } from "react-router-dom";
export default function OwnerInfoCard({ owner }) {

  const navigate = useNavigate();

  if (!owner) {
    return (
      <div className="card">
        <div className="card-body text-muted small">
          Owner information not available.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Owner Information</h6>
      </div>

      <div className="card-body d-flex justify-content-between flex-wrap gap-3">
        <div>
          <strong>
            {owner.firstName} {owner.lastName}
          </strong>
          <div className="text-muted small">{owner.title}</div>
          <span className="mt-1">
            {owner.id || "active"}

          </span>
        </div>

        <div className="d-flex gap-2">
          <button 
          onClick={() => navigate(`/dashboard/users/${owner.id}`)}
          className="btn btn-outline-primary btn-sm">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}


        