import {
  Conversation as ConversationType,
  Message as MessageType,
  OauthAccount as OauthAccountType,
  User as UserType,
} from "@prisma/client";
export type User = Omit<UserType, "hashedPassword"> & {
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
