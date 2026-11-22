import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '../../schemas/users'
import { useApiUsers } from '../../services/users.service'
import { useNavigate } from 'react-router'

export default function Register() {
  const { registerUser } = useApiUsers()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
    criteriaMode: "all",   // junta todos los errores de un campo 
  })

  // TODO: cuando lleguemos a auth, acá se llama al service de registro
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("Datos del registro:", data)
    return registerUser(data)
      .then(() => navigate("/login"))
      .catch((error) => console.error("error al registrar usuario:", error))
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="card shadow border-0 p-4 w-100" style={{ maxWidth: "460px" }}>

        <div className="text-center mb-4">
          <i className="bi bi-stars fs-1 text-warning"></i>
          <h1 className="h3 mt-2 mb-1">Crear cuenta</h1>
          <p className="text-body-secondary small mb-0">
            Sumate a HPWorld y creá tus propios personajes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <div className="input-group">
              <span className="input-group-text">@</span>
              <input type="text" className="form-control" id="username" {...register("username")} />
            </div>
            {errors.username && <p className="text-danger small mt-1 mb-0">{errors.username.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input type="text" className="form-control" id="email" {...register("email")} />
            </div>
            {errors.email && <p className="text-danger small mt-1 mb-0">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input type="password" className="form-control" id="password" {...register("password")} />
            </div>
            {errors.password ? (

              <ul className="text-danger small mt-1 mb-0 ps-3">
                {Object.values(errors.password.types ?? { msg: errors.password.message })
                  .flat()
                  .map((msg) => <li key={msg}>{msg}</li>)}
              </ul>

            ) : (

              <div className="form-text">
                Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
              </div>

            )}
          </div>

          <div className="mb-4">
            <label htmlFor="passwordConfirm" className="form-label">Confirmar contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input type="password" className="form-control" id="passwordConfirm" {...register("passwordConfirm")} />
            </div>
            {errors.passwordConfirm && <p className="text-danger small mt-1 mb-0">{errors.passwordConfirm.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            Registrarme
          </button>
        </form>

        <p className="text-center small mt-4 mb-0">
          Si ya tenés cuenta entonces <Link to="/login">iniciá sesión</Link>.
        </p>
      </div>
    </div>
  )
}