import {
  OauthAccount as OauthAccountType,
  User as UserType,
} from "@prisma/client";
export type OauthAccount = OauthAccountType & { user?: UserType };
export type User = UserType & { oauthAccounts?: OauthAccount[] };
