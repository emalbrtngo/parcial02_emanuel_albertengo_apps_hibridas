export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:3333/api"
    const token = JSON.parse(localStorage.getItem("user"))?.token

    return fetch(url + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token }),   // solo si hay token
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            if (!res.ok) throw new Error()
            else return res.json()
        })
}