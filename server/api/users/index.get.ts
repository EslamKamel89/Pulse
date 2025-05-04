import db from "~/utils/db";
import { userApiCollectionResource } from "~/utils/resources";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const users = await db.user.findMany({
    where: { NOT: { id: session.user.id } },
  });
  return userApiCollectionResource(users);
});
