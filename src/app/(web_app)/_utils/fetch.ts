export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await clientCustomFetch(input, init)
    return res.json()
}

export async function clientCustomFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    
    const options: RequestInit = {
        ...init,
        headers: {
            ...init?.headers,
        }
    }
    const res = await fetch(input, options)
    
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
    }

    return res
}