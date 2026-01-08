export default function CategoryNode({ node, level }) {
  return (
    <div style={{ marginLeft: level * 20 }}>
      <div className="d-flex align-items-center gap-2 py-1">
        <span className="fw-medium">
          {node.name}
        </span>

        {node.code && (
          <span className="badge bg-light text-dark border">
            {node.code}
          </span>
        )}
      </div>

      {Array.isArray(node.children) && node.children.length > 0 && (
        <div className="ms-2 border-start ps-3 mt-1">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
