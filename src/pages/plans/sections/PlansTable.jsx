import PlanActions from "./PlanActions";

export default function PlansTable({ plans, loading }) {

    // Todo activate the PLan  onReload as prop 
    
  if (loading) {
    return <div className="card p-4">Loading plans…</div>;
  }
  return (
    <div className="card">
      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              {/* <th className="text-end">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {plans.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="fw-medium">{p.name}</div>
                  <div className="text-muted small">{p.id}</div>
                </td>

                <td>
                  {p.price} {p.currency}
                </td>

                <td>
                  <span
                    className={`badge ${
                      p.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </td>

                 {/* <td className="text-end">
                  <PlanActions plan={p} onReload={onReload} />
                </td> */}
              </tr>
            ))}

            {plans.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No plans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
