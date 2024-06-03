// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      bodyAttrs: {
        class: "body-gradient-bg",
      },
    },
  },
  plugins: ["@/plugins/requests.ts"],
  runtimeConfig: {
    //apiBase : process.env.NUXT_API_BASE,
    public: {
      apiBase: process.env.NUXT_API_BASE,
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
});
