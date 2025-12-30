import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "rejected", label: "Rejected" },
  { value: "inactive", label: "Inactive" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All" },
  { value: "real-estate", label: "Real Estate" },
  { value: "job", label: "Job" },
  { value: "event", label: "Event" },
];

export default function ListingsFeedFilters({ value, onApply }) {
  const [draft, setDraft] = useState(value);

  // Keep inputs synced if URL changes (e.g. clicking dashboard cards)
  useEffect(() => {
    setDraft(value);
  }, [value]);

  function update(key, v) {
    setDraft((prev) => ({ ...prev, [key]: v }));
  }

  function submit(e) {
    e.preventDefault();
    onApply(draft);
  }

  function reset() {
    const clean = { status: "", type: "", search: "", userId: value.userId || "" };
    setDraft(clean);
    onApply(clean);
  }

  return (
    <form className="card border-0 shadow-sm mb-4" onSubmit={submit}>
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label small">Status</label>
            <select
              className="form-select"
              value={draft.status}
              onChange={(e) => update("status", e.target.value)}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label small">Listing Type</label>
            <select
              className="form-select"
              value={draft.type}
              onChange={(e) => update("type", e.target.value)}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or ID"
              value={draft.search}
              onChange={(e) => update("search", e.target.value)}
            />
          </div>

          <div className="col-md-2 d-grid gap-2">
            <button type="submit" className="btn btn-primary">Apply</button>
            <button type="button" className="btn btn-outline-secondary" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
