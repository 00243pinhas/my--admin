import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import {
  createRealEstateCategory,
  updateRealEstateCategory,
} from "../../../api/categoriesApi";

export default function CategoryFormModal({ category, onClose, onSaved }) {
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    if (!category) return;
    setName(category.name || "");
    setParentId(category.parentId || "");
  }, [category?.id]);

  if (!category) return null;

  async function submit() {
    const payload = {
      name,
      parentId: parentId || null,
    };

    if (category.id) {
      await updateRealEstateCategory(token, category.id, payload);
    } else {
      await createRealEstateCategory(token, payload);
    }

    onClose();
    onSaved();
  }

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {category.id ? "Edit Category" : "Create Category"}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Parent Category ID (optional)</label>
              <input
                className="form-control"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="Leave empty for root category"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
