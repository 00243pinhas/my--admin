import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";

import {
  fetchListingFiles,
  updateListingFile,
  deleteListingFile,
} from "../../../api/listingFilesApi";

import ListingFileItem from "./ListingFileItem";
import ConfirmModal from "../../../ components/ConfirmModal";
import Toast from "../../../ components/Toast";

export default function ListingFilesCard({ listingId }) {
  const { token } = useAuth();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

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

  async function load() {
    try {
      setLoading(true);
      const data = await fetchListingFiles(token, listingId);
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load files", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token || !listingId) return;
    load();
  }, [token, listingId]);

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      await deleteListingFile(
        token,
        listingId,
        deleteTarget.file_id // ✅ CORRECT
      );
      showToast("File deleted");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  }

  async function setRole(fileId, role) {
    try {
      await updateListingFile(token, listingId, fileId, { role });
      showToast("File role updated");
      await load();
    } catch (err) {
      console.error(err);
      showToast("Failed to update role", "error");
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Files & Media</strong>
        <div className="text-muted small">
          Files can only be uploaded by the listing owner.
        </div>
      </div>

      <div className="card-body">
        {loading && <div className="text-muted">Loading…</div>}

        {!loading && files.length === 0 && (
          <div className="text-muted small">
            No files attached to this listing.
          </div>
        )}

        {!loading && files.length > 0 && (
          <div className="row g-3">
            {files.map((f) => (
              <div key={f.file_id} className="col-md-3">
                <ListingFileItem
                  file={f}
                  onPreview={() => setPreviewFile(f)}
                  onDelete={() => setDeleteTarget(f)}
                  onSetRole={(role) =>
                    setRole(f.file_id, role) // ✅ CORRECT
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRM */}
      <ConfirmModal
        show={!!deleteTarget}
        title="Delete file"
        message="Are you sure you want to permanently delete this file?"
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* PREVIEW MODAL */}
      {previewFile && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {previewFile.file.originalName}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setPreviewFile(null)}
                />
              </div>

              <div className="modal-body text-center">
                {previewFile.file.mimeType.startsWith("image/") && (
                  <img
                    src={previewFile.file.signedUrl}
                    alt=""
                    className="img-fluid rounded"
                  />
                )}

                {previewFile.file.mimeType === "application/pdf" && (
                  <iframe
                    src={previewFile.file.signedUrl}
                    style={{ width: "100%", height: "70vh" }}
                    title="PDF preview"
                  />
                )}

                {!previewFile.file.mimeType.startsWith("image/") &&
                  previewFile.file.mimeType !==
                    "application/pdf" && (
                    <a
                      href={previewFile.file.signedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download file
                    </a>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

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
