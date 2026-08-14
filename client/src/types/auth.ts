export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token?: string; // If using JWT. If HTTP-only cookies are used, this is omitted.
}