// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/main.css",
    "~/node_modules/@appwrite.io/pink/dist/pink.css",
    "~/node_modules/@appwrite.io/pink-icons/dist/icon.css",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Almost SSR | Nuxt",
      link: [
        {
          rel: "icon",
          href: "/favicon.png",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Appwrite Loves Nuxt! Demo application with authorized server-side and client-side rendering.",
        },
        { property: "og:url", content: "https://nuxt.ssr.almostapps.eu/" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Almost SSR | Nuxt" },
        {
          property: "og:description",
          content:
            "Appwrite Loves Nuxt! Demo application with authorized server-side and client-side rendering.",
        },
        {
          property: "og:image",
          content: "https://nuxt.ssr.almostapps.eu/cover.png",
        },

        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:domain", content: "nuxt.ssr.almostapps.eu" },
        { property: "twitter:url", content: "https://nuxt.ssr.almostapps.eu/" },
        { property: "twitter:title", content: "Almost SSR | Nuxt" },
        {
          property: "twitter:description",
          content:
            "Appwrite Loves Nuxt! Demo application with authorized server-side and client-side rendering.",
        },
        {
          property: "twitter:image",
          content: "https://nuxt.ssr.almostapps.eu/cover.png",
        },
      ],
    },
  },
});
