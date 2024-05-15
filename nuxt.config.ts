import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        }
      ]
    }
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
