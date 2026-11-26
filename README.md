# HPCharacters

Proyecto para el **Parcial 2 de Aplicaciones Híbridas** (Escuela Da Vinci).

Es una app fullstack MERN sobre el mundo de Harry Potter. Se pueden explorar los personajes de la saga, ver su información y comentarlos. Además, cada usuario registrado puede crear sus propios personajes y armar su colección. Los administradores tienen un panel para gestionar personajes y usuarios.

Parte del backend que hice para el Parcial 1, que ahora es una API REST consumida por un frontend en React.

---

## Funcionalidades

**Visitantes (sin cuenta)**
- Ver el listado de personajes, con paginado, búsqueda por nombre y filtro por casa.
- Ver el detalle de cada personaje y sus comentarios.

**Usuarios registrados**
- Registro e inicio de sesión (contraseñas encriptadas y autenticación con JWT).
- Crear personajes propios, y editarlos o eliminarlos desde **Mi colección**.
- Comentar personajes y eliminar sus propios comentarios.

**Administradores**
- Panel de administración con una tabla de personajes (buscar, filtrar, editar y eliminar cualquiera).
- Tabla de usuarios: cambiar roles y dar de baja cuentas.
- Eliminar cualquier comentario (moderación).

---

## Tecnologías

**Backend:** Node.js, Express 5, MongoDB, JWT (`jsonwebtoken`), `bcrypt`, `zod`, `cors`, `dotenv`.

**Frontend:** React 19 + Vite, React Router, Context API, `react-hook-form` + `zod`, Bootstrap 5 y Bootstrap Icons, `jwt-decode`, `sonner` (feedback con toast).

---



## Levantar el proyecto

Necesitás tener instalado **Node.js** y **pnpm** (también funciona con npm), y una base de datos en **MongoDB Atlas**.

### 1. Backend

```bash
cd back
pnpm install
```

Crear un archivo `.env` en la carpeta `back/` (hay un `.env.example` de referencia):

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/
JWT_PW=una_clave_secreta_para_firmar_los_tokens
```

> El `.env` con los datos reales se entrega aparte.

Levantar el servidor:

```bash
pnpm run dev
```

La API queda en `http://localhost:3333/api`.

### 2. Frontend

En otra terminal:

```bash
cd front
pnpm install
pnpm run dev
```

La app queda en `http://localhost:5173`.

Por defecto el front se conecta a `http://localhost:3333/api`.

### 3. Primer administrador

Todos los usuarios nuevos se crean con rol `user`. Para tener el primer admin, registrate desde la app y cambiá el campo `rol` a `"admin"` desde MongoDB Atlas o Compass. Después, ese admin ya puede cambiar el rol de otros usuarios desde el panel.

## Endpoints

### Personajes

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/personajes` | Listado. Acepta `page`, `limit`, `title`, `house`, `gender`, `author` | Público |
| GET | `/api/personajes/:id` | Detalle (incluye sus comentarios) | Público |
| POST | `/api/personajes` | Crear personaje | Logueado |
| PUT | `/api/personajes/:id` | Editar personaje completo | Autor o admin |
| PATCH | `/api/personajes/:id` | Editar algunos campos | Autor o admin |
| DELETE | `/api/personajes/:id` | Eliminar (borrado lógico) | Autor o admin |

### Comentarios

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/personajes/:id/comentarios` | Comentar un personaje | Logueado |
| DELETE | `/api/personajes/comentarios/:commentId` | Eliminar un comentario | Autor o admin |

### Usuarios

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/users` | Registro | Público |
| POST | `/api/users/login` | Login (devuelve el token) | Público |
| GET | `/api/users` | Listado de usuarios | Admin |
| GET | `/api/users/:id/personajes` | Personajes de un usuario | Logueado |
| PATCH | `/api/users/:id/rol` | Cambiar el rol | Admin |
| DELETE | `/api/users/:id` | Dar de baja (borrado lógico) | Admin |

Las rutas protegidas necesitan el header `Authorization: Bearer <token>`.

---

## Algunas decisiones que tomé

- **Relaciones en MongoDB:** los comentarios se guardan en el personaje y también en el usuario que los escribió (cada copia con los datos que le sirven a ese lado). Para que no queden datos a medias, el borrado se hace con una **transacción**. Los personajes, en cambio, no se duplican: guardan el id de su autor y se filtran por ese campo.
- **Borrado lógico:** personajes y usuarios no se borran de la base, se marcan con `eliminado: true`. Así no se pierde información y se podrían restaurar.
- **Los comentarios no se editan:** como en muchas plataformas, el autor puede eliminar su comentario y el admin puede moderar cualquiera, pero nadie puede modificar lo que escribió otra persona.
- **Los datos del autor salen del token:** al crear un personaje o un comentario, el back toma el id y el username del JWT y no del body, para que nadie pueda publicar a nombre de otro.
- **Validación en los dos lados:** uso los mismos schemas de zod en el back (middlewares) y en el front (`react-hook-form`).
- **Sin React Compiler:** Vite trae activado el React Compiler, pero `react-hook-form` no es compatible con él (los formularios dejaban de recibir lo que se escribía), así que lo desactivé.

---

Hecho por **Emanuel Albertengo** para Aplicaciones Híbridas. Profesor: Villafañe Victor Emanuel