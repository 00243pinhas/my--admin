import { useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import CategoryDiagramNode from "./nodes/CategoryDiagramNode";
import "../categories-diagram.css";

const nodeTypes = {
  categoryNode: CategoryDiagramNode,
};

// Simple vertical layout: roots stacked; children to the right
function buildGraph(tree) {
  const nodes = [];
  const edges = [];

  const X_GAP = 360;
  const Y_GAP = 120;

  function walk(node, depth, row, parentId = null) {
    const id = node.id;

    nodes.push({
      id,
      type: "categoryNode",
      position: { x: depth * X_GAP, y: row * Y_GAP },
      data: {
        title: node.name,
        subtitle: node.slug,
        hasChildren: Array.isArray(node.children) && node.children.length > 0,
      },
    });

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: false,
      });
    }

    let nextRow = row;

    const children = Array.isArray(node.children) ? node.children : [];
    for (const child of children) {
      nextRow += 1;
      nextRow = walk(child, depth + 1, nextRow, id);
    }

    return nextRow;
  }

  let row = 0;
  for (const root of tree) {
    row = walk(root, 0, row, null) + 1;
  }

  return { nodes, edges };
}

export default function CategoriesDiagram({ tree, loading }) {
  const { nodes, edges } = useMemo(() => buildGraph(tree || []), [tree]);

  if (loading) return <div className="p-4">Loading categories…</div>;

  return (
    <div className="card">
      <div className="card-header bg-light">
        <strong>Hierarchy Map</strong>
        <div className="text-muted small">
          Zoom + pan enabled. Read-only.
        </div>
      </div>

      <div className="card-body p-0">
        {(!tree || tree.length === 0) ? (
          <div className="text-muted text-center py-5">No categories found</div>
        ) : (
          <div className="categories-diagram-canvas">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              // ✅ allow zoom + pan
              zoomOnScroll
              zoomOnPinch
              panOnDrag
              panOnScroll
              // ❌ disallow editing/mutation
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
            >
              <Background />
            </ReactFlow>
          </div>
        )}
      </div>
    </div>
  );
}
