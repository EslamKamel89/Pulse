import { pusherServer } from "~/server/utils/pusher";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { socket_id: socketId, channel_name: channelName } =
    await readBody(event);
  const data = { user_id: session.user.id };
  const response = pusherServer.authorizeChannel(socketId, channelName, data);
  return response;
});
