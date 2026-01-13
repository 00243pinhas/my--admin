export default function ListingFileItem({
  file,
  onPreview,
  onDelete,
  onSetRole,
}) {
  return (
    <div className="border rounded p-2 h-100 d-flex flex-column">
      <div className="text-center mb-2 small text-truncate">
        {file.file.originalName}
      </div>

      <select
        className="form-select form-select-sm mb-2"
        value={file.role || ""}
        onChange={(e) => onSetRole(e.target.value)}
      >
        <option value="">No role</option>
        <option value="primary">Primary</option>
        <option value="thumbnail">Thumbnail</option>
        <option value="gallery">Gallery</option>
        <option value="document">Document</option>
      </select>

      <div className="mt-auto d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-secondary w-100"
          onClick={onPreview}
        >
          Preview
        </button>

        <button
          className="btn btn-sm btn-outline-danger w-100"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
