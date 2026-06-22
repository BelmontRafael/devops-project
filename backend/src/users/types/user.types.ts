export type CreateUser = {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  // active?: boolean;
};

export type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRoles;
  active?: boolean;
};

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}
