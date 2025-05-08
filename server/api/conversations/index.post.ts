import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { userId, isGroup, members, name } = await readBody<{
    userId?: string | number;
    isGroup?: boolean;
    members?: number[];
    name: string;
  }>(event);
  if (isGroup && name && members && members?.length >= 2) {
    // pr(
    //   [...members.map((member) => ({ id: member })), session.user.id],
    //   "create params",
    // );
    // return;
    const groupConversation = db.conversation.create({
      data: {
        isGroup,
        name,
        users: {
          connect: [
            ...members.map((member) => ({ id: member })),
            { id: session.user.id },
          ],
        },
      },
      include: { users: true },
    });
    // todo:Pusher stuff
    return groupConversation;
  } else if (isGroup) {
    throw createError({
      statusCode: 401,
      statusMessage: "A group name and at least 2 members are required.",
    });
  }
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
      // todo: Pusher stuff
      return existingConversation[0];
    }
  }
  const newConversation = await db.conversation.create({
    data: {
      users: { connect: [{ id: Number(userId) }, { id: session.user.id }] },
    },
    include: { users: true },
  });
  // todo:pusher stuff
  return newConversation;
});
