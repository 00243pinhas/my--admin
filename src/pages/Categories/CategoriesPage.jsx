import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { fetchCategoryTree } from "../../api/categoriesApi";
import CategoriesTree from "./sections/CategoriesTree";

export default function CategoriesPage() {
  const { token } = useAuth();
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchCategoryTree(token);

        console.log(data);
       
        function normalizeTree(data) {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.tree)) return data.tree;
        if (Array.isArray(data?.data)) return data.data;
        return [];
      }
      setTree(normalizeTree(data));
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Categories</h4>
      </div>

      <div className="alert alert-light small mb-3">
        Categories define structured classification under listing types.
        They are hierarchical and managed by administrators.
      </div>

      <CategoriesTree tree={tree} loading={loading} />
    </div>
  );
}
