// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt"],
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components"
         */
        componentDir: "./components",
    },
});
