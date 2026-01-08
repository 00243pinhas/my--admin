import { useAuth } from "../../../auth/useAuth";
import { deleteRealEstateCategory } from "../../../api/categoriesApi";
import ConfirmModal from "../../../ components/ConfirmModal";

export default function DeleteCategoryModal({ category, onClose, onDeleted }) {
  const { token } = useAuth();

  if (!category) return null;

  async function confirm() {
    await deleteRealEstateCategory(token, category.id);
    onClose();
    onDeleted();
  }

  return (
    <ConfirmModal
      show={!!category}
      title="Delete category"
      message={`Delete category "${category.name}"? This cannot be undone.`}
      confirmVariant="danger"
      confirmLabel="Delete category"
      onConfirm={confirm}
      onCancel={onClose}
    />
  );
}
