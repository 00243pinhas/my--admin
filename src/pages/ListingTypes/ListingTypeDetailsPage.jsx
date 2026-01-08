import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import {
  fetchCategoryTree,
} from "../../api/categoriesApi";

import CategoriesTree from "../Categories/sections/CategoriesTree";
import CategoryFormModal from "./sections/CategoryFormModal";
import DeleteCategoryModal from "./sections/DeleteCategoryModal";
import CategoriesTable from "./sections/CategoriesTable";


export default function ListingTypeDetailsPage() {
  const { typeCode } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  function refreshAll() {
    loadTree();
    setRefreshKey((k) => k + 1);
  }


  // v1: only real-estate supported (clean & explicit)
  const isRealEstate = typeCode === "real-estate";

  async function loadTree() {
    try {
      setLoading(true);
      const data = await fetchCategoryTree(token);
      
      function normalizeSubs(data) {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data?.subscriptions)) return data.subscriptions;
          if (Array.isArray(data?.data)) return data.data;
          
        }
        setTree(normalizeSubs(data));
    //   setTree(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  }

//   console.log(tree)

  useEffect(() => {
    if (!token) return;
    if (!isRealEstate) return;
    loadTree();
  }, [token, typeCode]);

  if (!isRealEstate) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">
          Category management is not yet available for this listing type.
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/dashboard/listing-types")}
        >
          Back to Listing Types
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1">Real Estate Categories</h4>
          <div className="text-muted small">
            Manage hierarchical categories for Real Estate listings
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/dashboard/listing-types")}
          >
            Back
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setEditingCategory({})}
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* TREE */}
      <CategoriesTree
        tree={tree}
        loading={loading}
        onEdit={setEditingCategory}
        onDelete={setDeletingCategory}
      />

      <CategoriesTable
        refreshKey={refreshKey}
        onEdit={setEditingCategory}
        onDelete={setDeletingCategory}
      />


    <CategoryFormModal
      category={editingCategory}
      onClose={() => setEditingCategory(null)}
      onSaved={refreshAll}
    />

    <DeleteCategoryModal
      category={deletingCategory}
      onClose={() => setDeletingCategory(null)}
      onDeleted={refreshAll}
    />

    </div>
  );
}
