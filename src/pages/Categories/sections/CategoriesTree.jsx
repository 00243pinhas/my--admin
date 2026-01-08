import CategoryNode from "./CategoryNode";

export default function CategoriesTree({ tree, loading }) {
  if (loading) {
    return <div className="p-4">Loading categories…</div>;
  }

  return (
    <div className="card">
      <div className="card-header bg-light">
        <strong>Category Tree</strong>
        <div className="text-muted small">
          Hierarchical structure by listing type
        </div>
      </div>

      <div className="card-body">
        {tree.length === 0 && (
          <div className="text-muted text-center py-4">
            No categories found
          </div>
        )}

        <div className="d-flex flex-column gap-2">
          {tree.map((node) => (
            <CategoryNode key={node.id} node={node} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
}
