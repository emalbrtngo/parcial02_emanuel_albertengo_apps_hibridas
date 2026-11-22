export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:3333/api"
    return fetch( url + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
        .then((res) => {
            if (!res.ok) throw new Error()
            else return res.json()
        })
}