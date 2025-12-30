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


function normalizeListings(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.listings)) return data.listings;
  return [];
}

export default function ListingsFeed() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const filters = useMemo(() => ({
    status: searchParams.get("status") || "",
    type: searchParams.get("type") || "",
    search: searchParams.get("search") || "",
    userId: searchParams.get("userId") || "",
  }), [searchParams]);


  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    if (!token) return;
    loadListings();
  }, [token, filters.status]);

  async function loadListings() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAllListings(token, filters.status);
    //   console.log(data)
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
      const q = filters.search.toLowerCase();
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

    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });

    setSearchParams(params);
  }

  function onView(id) {
    navigate(`/dashboard/listings/${id}`);
  }

  async function onApprove(id) {
    try {
      await updateListingStatus(id, { status: "active" }, token);
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "active" } : l
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to approve listing");
    }
  }

  async function onReject(id) {
    try {
      await updateListingStatus(id, { status: "rejected" }, token);
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "rejected" } : l
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to reject listing");
    }
  }

  function requestDelete(listing) {
    setDeleteTarget(listing);
  }

  async function confirmDelete() {

    console.log(token)
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await deleteListing(deleteTarget,token);

      setListings((prev) =>
        prev.filter((l) => l.id !== deleteTarget.id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }


  return (
    <div className="container-fluid p-5">
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
      />

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete listing"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete? ${deleteTarget.title} This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete listing"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
