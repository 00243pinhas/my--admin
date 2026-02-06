export default function CategoryDiagramNode({ data }) {
  return (
    <div className="cat-node card shadow-sm">
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <div className="fw-semibold">{data.title}</div>
            {data.subtitle && (
              <div className="text-muted small">{data.subtitle}</div>
            )}
          </div>

          {data.hasChildren ? (
            <span className="badge bg-secondary">parent</span>
          ) : (
            <span className="badge bg-light text-dark">leaf</span>
          )}
        </div>
      </div>
    </div>
  );
}
