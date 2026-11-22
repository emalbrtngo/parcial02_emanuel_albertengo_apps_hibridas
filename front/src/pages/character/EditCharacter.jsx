"use no memo" // tenia problemas para editar personajes.. encotnre esta solución
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiCharacters } from "../../services/character.service.js";
import { charactersSchema } from "../../schemas/characters";
import ItemLoadingSpinner from "../../components/ItemLoadingSpinner.jsx";
import ErrorWithIcon from "../../components/ErrorWithIcon.jsx";

function toFormValues(data) {
  return {
    name: data.name ?? "",
    actor: data.actor ?? "",
    house: data.house || null,        
    species: data.species ?? "",
    gender: data.gender ?? "",
    dateOfBirth: data.dateOfBirth ?? "",
    yearOfBirth: data.yearOfBirth ?? undefined,
    ancestry: data.ancestry ?? "",
    eyeColour: data.eyeColour ?? "",
    hairColour: data.hairColour ?? "",
    wand: {
      wood: data.wand?.wood ?? "",
      core: data.wand?.core ?? "",
      length: data.wand?.length ?? undefined,
    },
    patronus: data.patronus ?? "",
    hogwartsStudent: Boolean(data.hogwartsStudent),
    hogwartsStaff: Boolean(data.hogwartsStaff),
    alive: Boolean(data.alive),
    image: data.image ?? "",
  };
}

export default function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("LOADING");
  const [error, setError] = useState(false);
  const { getCharacterById, updateCharacter } = useApiCharacters();

  const {
    register,  // conecta cada input con el form
    handleSubmit, // valida con zod y, si está todo bien, llama a onSubmit
    reset, // carga valores en el form (los del personaje)
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(charactersSchema),
  });

  useEffect(() => {
    getCharacterById(id)
      .then((data) => {
        reset(toFormValues(data));
        setEstado("READY");
      })
      .catch(() => setEstado("ERROR"));
  }, [id]);

  const onSubmit = (data) => {
    setError(false);
    console.log("Datos que se envían:", data)
    return updateCharacter(id, data)
      .then(() => navigate(-1))
      .catch(() => setError(true));
  };


  if (estado === "LOADING") return <ItemLoadingSpinner />;
  if (estado === "ERROR") return <ErrorWithIcon message="Error al cargar el personaje" />;

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Volver
      </button>

      <div className="container-sm">
        <form className="shadow-sm p-4 m-auto" onSubmit={handleSubmit(onSubmit)} 
          noValidate>
          {error && <ErrorWithIcon message="Error al editar el personaje" />}
          <h1 className="mb-4">Editar Personaje</h1>

          <h2 className="text-primary border-bottom pb-2 mb-3 h5">Información General</h2>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" {...register("name")} />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>

            <div className="col-md-6">
              <label htmlFor="actor" className="form-label">Actor</label>
              <input type="text" className="form-control" id="actor" {...register("actor")} />
              {errors.actor && <p className="text-danger">{errors.actor.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="house" className="form-label">Casa</label>
              <select
                className="form-select"
                id="house"
                {...register("house", { setValueAs: (v) => (v === "none" ? null : v) })}
              >
                <option value="" disabled>Seleccionar...</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Slytherin">Slytherin</option>
                <option value="Ravenclaw">Ravenclaw</option>
                <option value="Hufflepuff">Hufflepuff</option>
                <option value="none">Sin Casa</option>
              </select>
              {errors.house && <p className="text-danger">{errors.house.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="species" className="form-label">Especie</label>
              <input type="text" className="form-control" id="species" {...register("species")} />
              {errors.species && <p className="text-danger">{errors.species.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="gender" className="form-label">Género</label>
              <select className="form-select" id="gender" {...register("gender")}>
                <option value="" disabled>Seleccionar...</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="dateOfBirth" className="form-label">Fecha de Nacimiento</label>
              <input type="text" className="form-control" id="dateOfBirth" placeholder="31-07-1980" {...register("dateOfBirth")} />
              {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="yearOfBirth" className="form-label">Año de Nacimiento</label>
              <input type="number" className="form-control" id="yearOfBirth" {...register("yearOfBirth", { valueAsNumber: true })} />
              {errors.yearOfBirth && <p className="text-danger">{errors.yearOfBirth.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="ancestry" className="form-label">Ascendencia</label>
              <input type="text" className="form-control" id="ancestry" {...register("ancestry")} />
              {errors.ancestry && <p className="text-danger">{errors.ancestry.message}</p>}
            </div>
          </div>

          <h2 className="text-primary border-bottom pb-2 mb-3 h5">Rasgos Físicos</h2>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="eyeColour" className="form-label">Color de Ojos</label>
              <input type="text" className="form-control" id="eyeColour" {...register("eyeColour")} />
              {errors.eyeColour && <p className="text-danger">{errors.eyeColour.message}</p>}
            </div>

            <div className="col-md-6">
              <label htmlFor="hairColour" className="form-label">Color de Cabello</label>
              <input type="text" className="form-control" id="hairColour" {...register("hairColour")} />
              {errors.hairColour && <p className="text-danger">{errors.hairColour.message}</p>}
            </div>
          </div>

          <h2 className="text-primary border-bottom pb-2 mb-3 h5">Varita y Magia</h2>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label htmlFor="wandWood" className="form-label">Madera de la Varita</label>
              <input type="text" className="form-control" id="wandWood" {...register("wand.wood")} />
              {errors.wand?.wood && <p className="text-danger">{errors.wand.wood.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="wandCore" className="form-label">Corazón de la Varita</label>
              <input type="text" className="form-control" id="wandCore" {...register("wand.core")} />
              {errors.wand?.core && <p className="text-danger">{errors.wand.core.message}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="wandLength" className="form-label">Medida de la Varita</label>
              <input type="number" step="0.25" className="form-control" id="wandLength" {...register("wand.length", { valueAsNumber: true })} />
              {errors.wand?.length && <p className="text-danger">{errors.wand.length.message}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="patronus" className="form-label">Patronus</label>
              <input type="text" className="form-control" id="patronus" {...register("patronus")} />
              {errors.patronus && <p className="text-danger">{errors.patronus.message}</p>}
            </div>
          </div>

          <h2 className="text-primary border-bottom pb-2 mb-3 h5">Estado del personaje</h2>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="student" {...register("hogwartsStudent")} />
                <label className="form-check-label" htmlFor="student">Es estudiante de Hogwarts</label>
              </div>
              {errors.hogwartsStudent && <p className="text-danger">{errors.hogwartsStudent.message}</p>}
            </div>

            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="staff" {...register("hogwartsStaff")} />
                <label className="form-check-label" htmlFor="staff">Es personal de Hogwarts</label>
              </div>
              {errors.hogwartsStaff && <p className="text-danger">{errors.hogwartsStaff.message}</p>}
            </div>

            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="alive" {...register("alive")} />
                <label className="form-check-label" htmlFor="alive">Está vivo</label>
              </div>
              {errors.alive && <p className="text-danger">{errors.alive.message}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="image" className="form-label">Foto del personaje (opcional)</label>
              <input type="url" className="form-control" id="image" placeholder="https://..." {...register("image")} />
              {errors.image && <p className="text-danger">{errors.image.message}</p>}
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}