function unwrapApiResponse(data) {
    return data.results ? data.results : data
}

export const api = async (endpoint, method, init) => {
    const url = new URL(`api/${endpoint}`, "https://www.dnd5eapi.co/")
    const result = await fetch(url, {
        method,
        ...init,
    })

    if (result.ok) {
        return {
            ok: true,
            status: result.status,
            data: unwrapApiResponse(await result.json()),
        }
    } else {
        return {
            ok: false,
            status: result.status,
            error: new Error(await result.text()),
        }
    }
}

export const get = (endpoint, init) => api(endpoint, "GET", init)

export const queryWithRelated = (stub) => {
    return async () => {
        const initial = await get(stub)
        if (initial.ok) {
            const results = await Promise.all(
                initial.data.map((i) => get(`${stub}/${i.index}`)),
            )
            return results.map((i) => (i.ok ? i.data : i))
        } else {
            throw initial.error
        }
    }
}
