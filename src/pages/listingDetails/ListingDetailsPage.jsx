import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import {
  fetchListingById,
  updateListingStatus,
  deleteListing,
} from "../../api/listingsApi";

import ListingHeader from "./ListingHeader";
import BaseListingCard from "./BaseListingCard";
import ListingTypeCard from "./ListingTypeCard";
import TypeDetailsRenderer from "./TypeDetailsRenderer";
import ListingFilesCard from "./ListingFilesCard";
import OwnerInfoCard from "./OwnerInfoCard";
import ActivityTimeline from "./ActivityTimeline";

import ConfirmModal from "../../ components/ConfirmModal";
import Toast from "../../ components/Toast";

export default function ListingDetailsPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3000);
  }

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchListingById(token, listingId);
        setListing(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load listing", "error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, listingId]);

  async function handleAction(type) {
    if (!listing) return;

    try {
      setActionLoading(type);

      if (type === "approve") {
        await updateListingStatus(listing.id, { status: "active" }, token);
        setListing((l) => ({ ...l, status: "active" }));
        showToast("Listing approved successfully");
      }

      if (type === "reject") {
        setRejecting(true);
        return;
      }

      if (type === "archive") {
        await updateListingStatus(listing.id, { status: "archived" }, token);
        setListing((l) => ({ ...l, status: "archived" }));
        showToast("Listing archived");
      }

      if (type === "delete") {
        setDeleteTarget(listing);
      }
    } catch (err) {
      console.error(err);
      showToast("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function confirmReject() {
    if (!rejectReason.trim()) {
      showToast("Rejection reason is required", "error");
      return;
    }

    try {
      setActionLoading("reject");

      await updateListingStatus(
        listing.id,
        { status: "rejected", reason: rejectReason },
        token
      );

      setListing((l) => ({ ...l, status: "rejected" }));
      showToast("Listing rejected", "error");
    } catch (err) {
      console.error(err);
      showToast("Failed to reject listing", "error");
    } finally {
      setRejecting(false);
      setRejectReason("");
      setActionLoading(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      setActionLoading("delete");
      await deleteListing(deleteTarget.id, token);
      showToast("Listing deleted successfully");
      navigate("/dashboard/listings");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete listing", "error");
    } finally {
      setActionLoading(null);
      setDeleteTarget(null);
    }
  }

  if (loading) return <div className="p-4">Loading listing…</div>;
  if (!listing) return <div className="p-4 text-danger">Listing not found</div>;

  return (
    <div className="container-fluid py-4">

      <ListingHeader
        listing={listing}
        loading={actionLoading}
        onApprove={() => handleAction("approve")}
        onReject={() => handleAction("reject")}
        onArchive={() => handleAction("archive")}
        onDelete={() => handleAction("delete")}
      />

      <div className="row g-4 mt-1">
        <div className="col-12">
          <BaseListingCard listing={listing} />
        </div>

        <div className="col-12">
          <ListingTypeCard listing={listing} />
        </div>

        <div className="col-12">
          <TypeDetailsRenderer listing={listing} />
        </div>

        <div className="col-12">
          <ListingFilesCard files={listing.files || []} />
        </div>

        <div className="col-12">
          <OwnerInfoCard owner={listing.owner} />
        </div>

        <div className="col-12">
          <ActivityTimeline />
        </div>
      </div>

      {/* Reject Modal */}
      <ConfirmModal
        show={rejecting}
        title="Reject listing"
        message={
          <textarea
            className="form-control"
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Explain why this listing is being rejected..."
          />
        }
        confirmLabel="Reject listing"
        confirmVariant="danger"
        loading={actionLoading === "reject"}
        onConfirm={confirmReject}
        onCancel={() => {
          setRejecting(false);
          setRejectReason("");
        }}
      />

      {/* Delete Modal */}
      <ConfirmModal
        show={!!deleteTarget}
        title="Delete listing"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.title}"?`
            : ""
        }
        confirmLabel="Delete listing"
        confirmVariant="danger"
        loading={actionLoading === "delete"}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  );
}
