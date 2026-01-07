

export default function LanguagesTable({
  languages,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="text-muted">Loading languages…</div>
    );
  }

  console.log(languages);

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (languages.length === 0) {
    return (
      <div className="text-muted">
        No languages found.
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Status</th>
              {/* <th>Default</th> */}
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr key={lang.id || lang.code}>
                <td className="fw-medium">
                  {lang.code}
                </td>
                <td>{lang.name}</td>
                <td>
                  <span
                    className={`badge ${
                      lang.isActive
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {lang.isActive ? "Enabled" : "Disabled"}
                  </span>
                </td>
                {/* <td>
                  {lang.isDefault && (
                    <span className="badge bg-primary">
                      Default
                    </span>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
