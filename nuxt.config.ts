import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],
  modules: [
    "shadcn-nuxt",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "nuxt-auth-utils",
    "@prisma/nuxt",
  ],
  runtimeConfig: {
    public: {
      pusherAppKey: process.env.PUSHER_APP_KEY,
      pusherCluster: process.env.PUSHER_CLUSTER,
    },
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherSecret: process.env.PUSHER_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    oauth: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
});
