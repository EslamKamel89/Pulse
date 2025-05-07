import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { userId } = await readBody<{ userId: string | number }>(event);
  const existingConversation = await db.conversation.findMany({
    where: { users: { some: { id: Number(userId) } } },
    include: { users: true },
  });
  if (existingConversation.length) {
    return existingConversation[0];
  } else {
    const newConversation = await db.conversation.create({
      data: {
        users: { connect: [{ id: Number(userId) }, { id: session.user.id }] },
      },
      include: { users: true },
    });
    return newConversation;
  }
});
