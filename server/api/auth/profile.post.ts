import db from "~/utils/db";
import { userApiResource } from "~/utils/resources";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { image } = await readBody<{ image?: string }>(event);
  if (!image) {
    throw createError({
      statusCode: 401,
      statusMessage: "Image is required",
    });
  }
  const user = await db.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: image },
  });
  await clearUserSession(event);
  await setUserSession(event, { user: userApiResource(user) });

  return userApiResource(user);
});
