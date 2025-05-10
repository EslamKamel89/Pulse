import { pusherServer } from "~/server/utils/pusher";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { conversationId, image, body } = await readBody<{
    conversationId: number;
    image?: string;
    body: string;
  }>(event);
  const newMessage = await db.message.create({
    data: {
      image,
      body,
      sender: {
        connect: { id: session.user.id },
      },
      conversation: {
        connect: { id: conversationId },
      },
    },
    include: { conversation: true, sender: true },
  });
  const updatedConversation = await db.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
    include: { users: true, messages: true },
  });
  await pusherServer.trigger(
    `conversation.${conversationId}`,
    "message:new",
    newMessage,
  );
  const lastMessage =
    updatedConversation.messages[updatedConversation.messages.length - 1];
  updatedConversation.users.map((user) => {
    if (user.id) {
      pusherServer.trigger(`user.${user.id}`, "conversation:update", {
        id: conversationId,
        message: [lastMessage],
      });
    }
  });
  return newMessage;
});
