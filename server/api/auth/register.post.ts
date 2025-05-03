import db from "~/utils/db";
import { userApiResource } from "~/utils/resources";
import { registerSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    registerSchema.parse(body),
  );
  const existingUser = await db.user.findUnique({
    where: { email: body.email },
  });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "User already exists with this email",
    });
  }
  const password = await hashPassword(body.password);
  const user = await db.user.create({
    data: { email: body.email, name: body.name, hashedPassword: password },
  });
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not created",
    });
  }
  await setUserSession(event, user);
  return userApiResource(user);
});
