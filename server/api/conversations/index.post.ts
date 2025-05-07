import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { userId } = await readBody<{ userId: string | number }>(event);
  const existingConversation = await db.conversation.findMany({
    where: {
      users: {
        every: { OR: [{ id: Number(userId) }, { id: session.user.id }] },
      },
    },
    include: { users: true },
  });
  if (existingConversation.length) {
    const particpators = existingConversation[0].users;
    if (
      (particpators[0].id == userId || particpators[0].id == session.user.id) &&
      (particpators[1].id == userId || particpators[1].id == session.user.id)
    ) {
      return existingConversation[0];
    }
  }
  const newConversation = await db.conversation.create({
    data: {
      users: { connect: [{ id: Number(userId) }, { id: session.user.id }] },
    },
    include: { users: true },
  });
  return newConversation;
});
