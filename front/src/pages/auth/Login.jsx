import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as userSchemas from '../../schemas/users'
import { useApiUsers } from "../../services/users.service";
import ErrorWithIcon from "../../components/ErrorWithIcon"
import { useSession } from "../../context/session.context";
import { Link } from "react-router";

export default function Login() {
  const { login: loginApi } = useApiUsers()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting}
  } = useForm(
    {resolver: zodResolver(userSchemas.userLoginSchema)}
  )
  const [error, setError] = useState('')
  const auth = useSession()

const onSubmit = async (data) => {
  try {
    const userLogueado = await loginApi(data)

    auth.login(userLogueado)// guardo login en el context
    navigate("/")
  } catch {
    setError("Usuario o contraseña incorrectos")
  }
}

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center">Login</h3>
            {/* <div className="d-grid gap-2 mb-3">
              <a href="#" className="btn btn-social btn-google">
                <i className="bi bi-google me-2"></i> Inicia Sesión con Google
              </a>
              <a href="#" className="btn btn-social btn-facebook">
                <i className="bi bi-facebook me-2"></i> Inicia Sesión con
                Facebook
              </a>
              <a href="#" className="btn btn-social btn-twitter">
                <i className="bi bi-twitter me-2"></i> Inicia Sesión con Twitter
              </a>
            </div> */}
            <p className=" card">
              <span className="bg-light shadow p-3">
                Iniciá sesión para acceder a tu colección de personajes personalizados
              </span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {error && <ErrorWithIcon message={error} />}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email")}
                  required
                />
                { errors.email && (<p className="text-danger">{errors.email.message}</p>)}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                  required
                />
                { errors.password && (<p className="text-danger">{errors.password.message}</p>)}
              </div>
              {/* <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Recuérdame
                </label>
              </div> */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesión
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
          <Link to="/register" className="btn btn-outline-primary text-nowrap">
            Registrate
          </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
