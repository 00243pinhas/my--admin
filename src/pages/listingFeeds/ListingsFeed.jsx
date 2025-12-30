import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import {
  fetchAllListings,
  updateListingStatus,
  deleteListing,
} from "../../api/listingsApi";

import ListingsFeedHeader from "./ListingsFeedHeader";
import ListingsFeedFilters from "./ListingsFeedFilters";
import ListingsFeedTable from "./ListingsFeedTable";

import ConfirmModal from "../../ components/ConfirmModal";
import Toast from "../../ components/Toast";

import "./listings-feed.css";



function normalizeListings(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.listings)) return data.listings;
  return [];
}


export default function ListingsFeed() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const filters = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      type: searchParams.get("type") || "",
      search: searchParams.get("search") || "",
      userId: searchParams.get("userId") || "",
    }),
    [searchParams]
  );

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(null); // { id, type }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
    loadListings();
  }, [token, filters.status]);

  async function loadListings() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAllListings(token, filters.status);
      setListings(normalizeListings(data));
    } catch (err) {
      console.error(err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }


  const visibleListings = useMemo(() => {
    let items = [...listings];

    if (filters.userId) {
      items = items.filter(
        (l) => (l.user_id || l.user?.id) === filters.userId
      );
    }

    if (filters.type) {
      items = items.filter(
        (l) =>
          (l.listing_type || l.type || "")
            .toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      items = items.filter(
        (l) =>
          (l.title || "").toLowerCase().includes(q) ||
          (l.id || "").toLowerCase().includes(q)
      );
    }

    return items;
  }, [listings, filters]);


  function applyFilters(next) {
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }


  function onView(id) {
    navigate(`/dashboard/listings/${id}`);
  }

  async function onApprove(id) {
    try {
      setActionLoading({ id, type: "approve" });

      await updateListingStatus(id, { status: "active" }, token);

      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "active" } : l
        )
      );

      showToast("Listing approved successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to approve listing", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function onReject(id) {
    try {
      setActionLoading({ id, type: "reject" });

      await updateListingStatus(id, { status: "rejected" }, token);

      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "rejected" } : l
        )
      );

      showToast("Listing rejected");
    } catch (err) {
      console.error(err);
      showToast("Failed to reject listing", "error");
    } finally {
      setActionLoading(null);
    }
  }

  function requestDelete(listing) {
    setDeleteTarget(listing);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteListing(deleteTarget.id, token);

      setListings((prev) =>
        prev.filter((l) => l.id !== deleteTarget.id)
      );

      showToast("Listing deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete listing", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }


  return (
    <div className="container-fluid">
      <ListingsFeedHeader />

      <ListingsFeedFilters
        value={filters}
        onApply={applyFilters}
      />

      <ListingsFeedTable
        listings={visibleListings}
        loading={loading}
        error={error}
        onView={onView}
        onApprove={onApprove}
        onReject={onReject}
        onDelete={requestDelete}
        actionLoading={actionLoading}
      />

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
        loading={deleting}
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
