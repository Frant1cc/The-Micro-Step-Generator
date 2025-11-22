export const API_KEY = (import.meta.env.VITE_API_KEY ?? '') as string
export const hasApiKey = (): boolean => API_KEY.length > 0