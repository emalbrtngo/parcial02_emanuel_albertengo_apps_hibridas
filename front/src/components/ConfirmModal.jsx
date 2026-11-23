// Uso:
//   const [aEliminar, setAEliminar] = useState(null)   // el ítem a borrar, o null si el modal está cerrado
//
//   <button onClick={() => setAEliminar(usuario)}>Eliminar</button>
//
//   <ConfirmModal
//     show={aEliminar !== null}
//     title="Eliminar usuario"
//     message={`¿Seguro que querés eliminar a ${aEliminar?.username}?`}
//     confirmText="Eliminar"
//     onConfirm={() => handleDelete(aEliminar._id)}
//     onCancel={() => setAEliminar(null)}
//   />

export default function ConfirmModal({
  show,
  title = "Confirmar acción",
  message = "¿Estás seguro?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger", // color del botón de confirmar: danger, primary, warning...
  loading = false, // deshabilita los botones mientras se procesa
  onConfirm,
  onCancel,
}) {
  if (!show) return null

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onCancel}></div>

      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" onClick={onCancel}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title">
                <i className={`bi bi-exclamation-triangle-fill text-${variant} me-2`}></i>
                {title}
              </h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={loading}></button>
            </div>

            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>

            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={loading}>
                {cancelText}
              </button>
              <button type="button" className={`btn btn-${variant}`} onClick={onConfirm} disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}