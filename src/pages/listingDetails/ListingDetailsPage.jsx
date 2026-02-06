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
import ListingFilesCard from "./filesection/ListingFilesCard";
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

  const [actionLoading, setActionLoading] = useState(null); // approve | reject | archive | delete
  const [deleteTarget, setDeleteTarget] = useState(null);

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
        await updateListingStatus(
          listing.id,
          { status: "active" },
          token
        );
        setListing((l) => ({ ...l, status: "active" }));
        showToast("Listing approved successfully");
      }

      if (type === "reject") {
        await updateListingStatus(
          listing.id,
          { status: "rejected" },
          token
        );
        setListing((l) => ({ ...l, status: "rejected" }));
        showToast("Listing rejected", "error");
      }

      if (type === "archive") {
        await updateListingStatus(
          listing.id,
          { status: "archived" },
          token
        );
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

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      setActionLoading("delete");
      await deleteListing(deleteTarget.id, token);
      showToast("Listing deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete listing", "error");
    } finally {
      setActionLoading(null);
      setDeleteTarget(null);
    }
  }

  if (loading) {
    return <div className="p-4">Loading listing…</div>;
  }

  if (!listing) {
    return <div className="p-4 text-danger">Listing not found</div>;
  }



  console.log(listing);

  return (
    <div className="container-fluid py-4">

      {/* Sticky Header with Actions */}
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
          <ListingFilesCard listingId={listing.id} />
        </div>

        <div className="col-12">
          {console.log(listing)}
          <OwnerInfoCard owner={listing.user} />
        </div>

        <div className="col-12">
          <ActivityTimeline />
        </div>

      </div>

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete listing"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.title}"? This action cannot be undone.`
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
        onClose={() =>
          setToast((t) => ({ ...t, show: false }))
        }
      />
    </div>
  );
}
