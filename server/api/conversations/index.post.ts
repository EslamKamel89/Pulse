import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { userId } = await readBody<{ userId: string | number }>(event);
  const existingConversation = await db.conversation.findMany({
    where: { users: { some: { id: session.user.id } } },
  });
  if (existingConversation.length) {
    return existingConversation[0];
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo: Conversation creation",
    });
  }
});
