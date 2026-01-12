import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { fetchLanguages } from "../../api/languagesApi";
import LanguagesTable from "./sections/LanguagesTable";

export default function LanguagesPage() {
  const { token } = useAuth();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchLanguages(token);
        console.log(data);
        setLanguages(
            Array.isArray(data.languages)
                ? data.languages
                : []
            );

      } catch (err) {
        console.error(err);
        setError("Failed to load languages");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  console.log(languages);

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h3>Languages</h3>
        <p className="text-muted small">
          Manage supported platform languages.
        </p>
      </div>

      <LanguagesTable
        languages={languages}
        loading={loading}
        error={error}
      />
    </div>
  );
}
