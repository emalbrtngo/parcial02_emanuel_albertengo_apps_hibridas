import { useSession } from "../../context/session.context"

export default function CommentList({ comments = [], onDelete }) {
  const { user } = useSession()
  const esAdmin = user?.rol === "admin"
  // console.log(comments);
  
  if (comments.length === 0) {
    return (
      <div className="text-center text-body-secondary py-4">
        Todavía no hay comentarios
      </div>
    )
  }

  return (
    <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
      {comments.map((comment) => (
        <li key={comment._idComment} className="d-flex gap-3">
          {/* avatar */}
          <div
            className="rounded-circle bg-primary-subtle text-primary-emphasis fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "40px", height: "40px" }}
          >
            {comment.username?.charAt(0).toUpperCase() || "?"}
          </div>

    <div className="d-flex flex-column bg-body-tertiary rounded-3 px-3 py-2 flex-grow-1">
      <div className="d-flex justify-content-between align-items-center">
        <strong className="small">{comment.username || "Usuario inexistente"}</strong>
      </div>

      <p className="mb-1 mt-1">{comment.content}</p>

      {(user?._id === comment._id || esAdmin) && (
        <div className="d-flex justify-content-end mt-1">
          <button
            className="btn btn-sm btn-outline-danger py-0 px-2"
            style={{ fontSize: "0.75rem" }}
            onClick={() => onDelete(comment._idComment)}
          >
            Eliminar
          </button>
        </div>
      )}

      {/* <button>Editar</button> */}
    </div>

        </li>
      ))}
    </ul>
  )
}