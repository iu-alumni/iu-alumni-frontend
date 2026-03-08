import axiosInstance from "~/api/index";

// Set the axios baseURL from Nuxt runtime config.
// This runs on both server and client inside a proper Nuxt context so
// useRuntimeConfig() is always available:
//   - Server: reads NUXT_PUBLIC_API_BASE from the container environment
//   - Client: reads the value SSR-hydrated into window.__NUXT__ by the server
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    axiosInstance.defaults.baseURL = config.public.apiBase;
});
