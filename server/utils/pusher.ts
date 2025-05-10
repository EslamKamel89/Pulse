import PusherServer from "pusher";
const {
  pusherAppId,
  pusherSecret,
  public: { pusherAppKey, pusherCluster },
} = useRuntimeConfig();
export const pusherServer = new PusherServer({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherSecret,
  cluster: pusherCluster,
  useTLS: true,
});
