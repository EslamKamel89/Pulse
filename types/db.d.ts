import {
  Conversation as ConversationType,
  OauthAccount as OauthAccountType,
  User as UserType,
} from "@prisma/client";
export type User = UserType & {
  oauthAccounts?: OauthAccount[];
  conversations?: Conversation[];
  messages?: Message[];
};
export type OauthAccount = OauthAccountType & { user?: UserType };
export type Conversation = ConversationType & {
  users?: User[];
  messaages?: Message[];
};
export type Message = MessageType & {
  sender?: User;
  conversation?: Conversation;
};
