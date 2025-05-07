import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { userId } = await readBody<{ userId: string | number }>(event);
  const existingConversation = await db.conversation.findMany({
    where: { users: { some: { id: Number(userId) } } },
  });
  if (existingConversation.length) {
    return existingConversation[0];
  } else {
    const newConversation = await db.conversation.create({
      data: {},
    });
  }
});
