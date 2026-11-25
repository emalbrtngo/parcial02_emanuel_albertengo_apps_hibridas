// components/comments/CommentForm.jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentsSchema } from '../../schemas/comments'

const MAX_LENGTH = 500

// const user = JSON.parse(localStorage.getItem('user') || 'null');

export default function CommentForm( {characterId, onSubmitComment} ) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(commentsSchema) })

  const content = watch('content') ?? ""

  const onSubmit = (data) => {
    onSubmitComment(characterId, { content: data.content })
    reset()
    // console.log("Comentario es: ", comentario)    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card border-0 shadow-sm p-3 mb-4">
      <label htmlFor="content" className="form-label fw-semibold mb-2">
        <i className="bi bi-chat-dots me-2"></i>Dejá tu comentario
      </label>

      <textarea
        id="content"
        className="form-control"
        rows="3"
        placeholder="¿Qué te parece este personaje?"
        maxLength={MAX_LENGTH}
        {...register('content')}
      ></textarea>
      {errors.content && <p className="text-danger small mt-1 mb-0">{errors.content.message}</p>}

      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-body-secondary">{content.length}/{MAX_LENGTH}</small>
        <button type="submit" className="btn btn-primary btn-sm" disabled={!content.trim() || isSubmitting}>
          Publicar
        </button>
      </div>
    </form>
  )
}