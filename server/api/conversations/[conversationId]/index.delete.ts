import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const conversationId = getRouterParam(event, "conversationId");
  const existingConversation = await db.conversation.findUnique({
    where: {
      id: Number(conversationId),
      users: { some: { id: session.user.id } },
    },
  });
  if (existingConversation) {
    const deletedConversation = await db.conversation.delete({
      where: {
        id: Number(conversationId),
        users: { some: { id: session.user.id } },
      },
    });
    return deletedConversation;
  } else {
    throw createError({
      statusCode: 404,
      statusMessage:
        "No conversation With this id exists or you don't have the authorization",
    });
  }
});
