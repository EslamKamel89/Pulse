import Pusher from "pusher-js";
export default defineNuxtPlugin({
  name: "pusher",
  enforce: "post", // or 'pre'
  async setup(nuxtApp) {
    const {
      public: { pusherAppKey, pusherCluster },
    } = useRuntimeConfig();
    const pusher = new Pusher(pusherAppKey, {
      cluster: pusherCluster,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
        transport: "ajax",
      },
    });
    return { provide: { pusher } };
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    "app:created"() {
      const nuxtApp = useNuxtApp();
      // do something in the hook
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
