
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import {
  updateListingStatus,
  deleteListing,
} from "../../api/listingsApi";
import { toast } from "react-toastify";

export default function ModerationActionsCard({ listing, onDone }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleAction(type) {
    try {
      setLoading(true);

      if (type === "approve") {
        await updateListingStatus(
          listing.id,
          { status: "approved" },
          token
        );
      }

      if (type === "reject") {
        await updateListingStatus(
          listing.id,
          { status: "rejected" },
          token
        );
      }

      if (type === "archive") {
        await updateListingStatus(
          listing.id,
          { status: "archived" },
          token
        );
      }

      if (type === "delete") {
        await deleteListing(listing.id, token);
      }

      toast.success("Action completed successfully");
      onDone();

    } catch (err) {
      toast.error("Action failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card border-danger">
      <div className="card-header bg-light">
        <h6 className="mb-0 text-danger">Moderation Actions</h6>
      </div>

      <div className="card-body d-flex gap-2 flex-wrap">
        <button
          className="btn btn-success"
          disabled={loading}
          onClick={() => handleAction("approve")}
        >
          Approve
        </button>

        <button
          className="btn btn-outline-danger"
          disabled={loading}
          onClick={() => handleAction("reject")}
        >
          Reject
        </button>

        <button
          className="btn btn-outline-secondary"
          disabled={loading}
          onClick={() => handleAction("archive")}
        >
          Archive
        </button>

        <button
          className="btn btn-danger"
          disabled={loading}
          onClick={() => handleAction("delete")}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
