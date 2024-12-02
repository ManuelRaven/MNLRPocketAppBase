import type { UsersRecord } from "./pocketbase-types";

// type based on UserRecord but make the id and tokenKey optional
export type UserRequest = Omit<UsersRecord, "id" | "tokenKey"> & {
  passwordConfirm: string;
};
