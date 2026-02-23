import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const nuxtGlobals = {
    // Nuxt
    defineNuxtConfig: "readonly",
    defineNuxtPlugin: "readonly",
    defineNuxtRouteMiddleware: "readonly",
    defineEventHandler: "readonly",
    definePageMeta: "readonly",
    useRuntimeConfig: "readonly",
    useRoute: "readonly",
    useRouter: "readonly",
    useState: "readonly",
    useFetch: "readonly",
    useAsyncData: "readonly",
    navigateTo: "readonly",
    useNuxtApp: "readonly",
    // Vue 3 auto-imports
    ref: "readonly",
    reactive: "readonly",
    computed: "readonly",
    watch: "readonly",
    watchEffect: "readonly",
    onMounted: "readonly",
    onUnmounted: "readonly",
    onBeforeMount: "readonly",
    onBeforeUnmount: "readonly",
    onUpdated: "readonly",
    nextTick: "readonly",
    toRef: "readonly",
    toRefs: "readonly",
    unref: "readonly",
    isRef: "readonly",
    readonly: "readonly",
};

export default defineConfig([
    {
        ignores: [".nuxt/**", ".output/**", "node_modules/**"],
    },
    {
        extends: compat.extends("eslint:recommended", "prettier"),
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...nuxtGlobals,
            },
        },
    },
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ["**/*.ts"],
        languageOptions: {
            ...config.languageOptions,
            globals: {
                ...globals.node,
                ...globals.browser,
                ...nuxtGlobals,
            },
        },
    })),
    ...pluginVue.configs["flat/recommended"].map((config) => ({
        ...config,
        files: ["**/*.vue"],
        languageOptions: {
            ...config.languageOptions,
            parserOptions: {
                ...config.languageOptions?.parserOptions,
                parser: tseslint.parser,
            },
            globals: {
                ...globals.browser,
                ...nuxtGlobals,
            },
        },
    })),
    // Vue-specific rule overrides
    {
        files: ["**/*.vue"],
        rules: {
            // Components imported in <script setup> are used in <template>
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            // Pages use file-based names like index.vue or [id].vue
            "vue/multi-word-component-names": "off",
        },
    },
]);