// components/comments/CommentList.jsx
// Recibe el array character.comments. Ajustá los nombres de los campos
// (text, user.name, date) a como los guardás en tu back.
const comentariosEjemplo = [
  {
    _idComment: "1",
    content: "¡Me encanta este personaje!",
    user: { name: "Juan" },
    date: "2024-06-01T12:00:00Z"
  },
  {
    _idComment: "2",
    content: "No me gusta mucho.",
    user: { name: "Ana" },
    date: "2024-06-02T15:30:00Z"
  }
]

export default function CommentList({ comments = comentariosEjemplo }) {

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
          {/* Avatar con la inicial del usuario */}
          <div
            className="rounded-circle bg-primary-subtle text-primary-emphasis fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "40px", height: "40px" }}
          >
            {comment.user?.name?.charAt(0).toUpperCase() || "?"}
          </div>

          <div className="bg-body-tertiary rounded-3 px-3 py-2 flex-grow-1">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="small">{comment.user?.name || "Anónimo"}</strong>
              {comment.date && (
                <small className="text-body-secondary">
                  {new Date(comment.date).toLocaleDateString("es-AR")}
                </small>
              )}
            </div>
            <p className="mb-0 mt-1">{comment.content}</p>
            {/* Más adelante: botón de borrar visible solo para el autor o un admin */}
          </div>
        </li>
      ))}
    </ul>
  )
}