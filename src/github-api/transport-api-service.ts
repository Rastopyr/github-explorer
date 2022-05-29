
export type TransportAPIService = {
    request: <T>(location: string) => Promise<T>;
}

export function createHTTPTransportAPIService(): TransportAPIService {
    async function request<T>(location: string) {
        const result = await fetch(`https://api.github.com/${location}`);

        return await result.json() as T;
    }
   
    return {
        request
    } 
}
