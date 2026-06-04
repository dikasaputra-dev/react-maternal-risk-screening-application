export type UserRole = "nurse" | "admin";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
