import db from "~/utils/db";
import { loginSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.parse(body),
  );
  const user = await db.user.findUnique({ where: { email: body.email } });
  if (
    user &&
    (await verifyPassword(user?.hashedPassword ?? "", body.password))
  ) {
    return user;
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }
});
