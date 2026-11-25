export default function UserCard({ user, totalCharacters = 0 }) {
    if (!user) return null;

    const inicial = user.username?.charAt(0).toUpperCase() || "?";

    return (
        <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 d-flex flex-column flex-sm-row align-items-center gap-4">
            <div
            className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0 fs-2"
            style={{ width: "80px", height: "80px" }}
            >
            {inicial}
            </div>

            <div className="flex-grow-1 text-center text-sm-start">
            <h1 className="h4 mb-1">@{user.username}</h1>
            <p className="mb-0">{user.email}</p>
            </div>

            <div className="text-center px-3">
            <div className="fs-3 fw-bold lh-1">{totalCharacters}</div>
            <small className="text-body-secondary">
                {totalCharacters === 1 ? "personaje" : "personajes"}
            </small>
            </div>
        </div>
        </div>
    );
}
