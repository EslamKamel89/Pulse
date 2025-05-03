import db from "~/utils/db";
import { loginSchema } from "~/utils/validation";
import { userApiResource } from "./../../../utils/resources";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.parse(body),
  );
  const user = await db.user.findUnique({
    where: { email: body.email },
    include: { oauthAccounts: true },
  });
  if (!user?.hashedPassword && !user?.oauthAccounts.length) {
    throw createError({
      statusCode: 401,
      statusMessage:
        "You are not allowed to login with email and password, please use Oauth instead",
    });
  }
  if (
    user &&
    (await verifyPassword(user?.hashedPassword ?? "", body.password))
  ) {
    await clearUserSession(event);
    await setUserSession(event, { user: userApiResource(user) });
    return userApiResource(user);
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }
});
