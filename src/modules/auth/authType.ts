export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  session: string;
  user: string;
};
