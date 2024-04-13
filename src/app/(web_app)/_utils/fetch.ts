export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await customFetch(input, init)
    return res.json()
}

export async function customFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    
    const options: RequestInit = {
        ...init,
        headers: {
            ...init?.headers,
        }
    }

    return fetch(input, options)
}