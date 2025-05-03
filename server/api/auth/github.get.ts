import db from "~/utils/db";
import { userApiResource } from "~/utils/resources";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const currentUser = await db.user.findUnique({
      where: { email: user.email ?? "" },
    });
    if (currentUser) {
      await setUserSession(event, {
        user: userApiResource(currentUser),
      });
    } else {
      const newUser = await db.user.create({
        data: {
          email: user.email ?? "",
          name: user.name ?? "",
          avatarUrl: user.avatar_url ?? "",
          oauthAccounts: {
            create: [{ providerId: "github", providerUserId: user.id + "" }],
          },
        },
      });
      await setUserSession(event, { user: userApiResource(newUser) });
    }
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
