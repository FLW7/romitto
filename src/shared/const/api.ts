export const ROOT_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export const ROOT_URL_CORE = process.env.NEXT_PUBLIC_API_URL_CORE ?? '';

export const API = {
  base: ROOT_URL,
  baseCore: ROOT_URL_CORE,
  timeout: 60_000,
};
