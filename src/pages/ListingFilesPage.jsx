import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import {
  fetchListingFiles,
  updateListingFile,
  deleteListingFile,
} from "../api/listingFilesApi";
import { API_BASE } from "../api/config";

const FILE_ROLE_OPTIONS = ["cover", "gallery", "other"];

export default function ListingFilesPage() {
  const { id: listingId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    loadFiles();
  }, [token, listingId]);

  async function loadFiles() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchListingFiles(token, listingId);
      setFiles(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load listing files");
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(fileId, role) {
    try {
      await updateListingFile(token, listingId, fileId, { role });
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, role } : f
        )
      );
    } catch {
      alert("Failed to update file role");
    }
  }

  async function handleDelete(fileId) {
    if (!confirm("Delete this file?")) return;

    try {
      await deleteListingFile(token, listingId, fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch {
      alert("Failed to delete file");
    }
  }

  if (!token) return <div>Admin access required</div>;
  if (loading) return <div>Loading files…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>Listing Files</h1>

      {files.length === 0 && <p>No files attached to this listing.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "220px",
            }}
          >
            {file.mime_type?.startsWith("image/") ? (
              <img
                src={`${API_BASE}/files/${file.id}/stream`}
                alt="listing file"
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            ) : (
              <p> {file.mime_type}</p>
            )}

            <div style={{ marginTop: "0.5rem" }}>
              <label>
                Role:
                <select
                  value={file.role || "other"}
                  onChange={(e) =>
                    handleRoleChange(file.id, e.target.value)
                  }
                >
                  {FILE_ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              style={{ marginTop: "0.5rem", color: "red" }}
              onClick={() => handleDelete(file.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



