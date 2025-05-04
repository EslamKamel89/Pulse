// auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: int | string;
    email: string;
    name: string;
    avatarUrl?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
