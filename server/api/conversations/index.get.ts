import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const conversations = await db.conversation.findMany({
    where: { users: { some: { id: session.user.id } } },
    orderBy: { lastMessageAt: "desc" },
    include: {
      users: true,
      messages: { include: { sender: true } },
    },
  });
  return conversations;
});
