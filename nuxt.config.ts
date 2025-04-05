import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // experimental: { appManifest: false },
  compatibilityDate: "2024-11-01",
  future: { compatibilityVersion: 4 },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: false },
  modules: ["@nuxt/image", "@vueuse/nuxt", "nuxt-auth-utils"],
});
