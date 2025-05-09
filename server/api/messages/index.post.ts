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
  });
  const newConversation = await db.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
    include: { users: true, messages: true },
  });
  return newConversation;
});
