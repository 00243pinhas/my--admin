export default function Toast({ show, message, type = "success", onClose }) {
  if (!show) return null;

  const bg =
    type === "success"
      ? "bg-success"
      : type === "error"
      ? "bg-danger"
      : "bg-secondary";

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1100 }}
    >
      <div className={`toast show text-white ${bg}`}>
        <div className="toast-header text-white bg-transparent border-0">
          <strong className="me-auto">
            {type === "success" ? "Success" : "Error"}
          </strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          />
        </div>

        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}
