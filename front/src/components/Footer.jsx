import { Link } from "react-router";

export default function Footer() {

    return (
        <footer className="bg-dark text-light mt-auto pt-4 pb-3 py-3" data-bs-theme="dark">
        <div className="container">
            <div className="row g-4">
                <div className="col-12 col-md-5">
                    <h2 className="h5 mb-2">HPP</h2>
                    <p className="text-body-secondary small mb-0">
                    Explorá los personajes del mundo mágico y creá los tuyos
                    </p>
                </div>

                <div className="col-6 col-md-3">
                    <h3 className="h6 text-uppercase small">Navegación</h3>
                    <ul className="list-unstyled small mb-0">
                    <li><Link className="link-light link-underline-opacity-0" to="/">Home</Link></li>
                    <li><Link className="link-light link-underline-opacity-0" to="/personajes">Personajes</Link></li>
                    <li><Link className="link-light link-underline-opacity-0" to="/micolleccion">Mi colección</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-4">
                    <h3 className="h6 text-uppercase">Proyecto</h3>
                    <p className="mb-1">Emanuel Albertengo</p>
                    <p className="mb-2">Aplicaciones Híbridas · Escuela Da Vinci</p>
                </div>
            </div>

            <hr className="border-secondary my-3" />

            <p className="text-body-secondary small text-center mb-0">
                © 2026 Harry Potter & Personajes 
            </p>
        </div>
        </footer>
    );
}