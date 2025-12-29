import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import {
  fetchListingFiles,
} from "../api/listingFilesApi";

export default function ListingFilesPage() {
  const { listingId } = useParams();
  const { token } = useAuth();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!listingId || !token) return;

    async function loadFiles() {
      try {
        setLoading(true);
        const data = await fetchListingFiles(token, listingId);
        setFiles(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load listing files");
      } finally {
        setLoading(false);
      }
    }

    loadFiles();
  }, [listingId, token]);

  if (loading) return <div>Loading files…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Listing Files</h1>

      {files.length === 0 && <p>No files found.</p>}

      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.filename || f.path}
          </li>
        ))}
      </ul>
    </div>
  );
}
