import type { UserRequest } from "@/types/custom-types";
import { usePb } from "./usePb";

const pb = usePb();

export function useAuth() {
  const listAuthOptions = async () => {
    return await pb.collection("users").listAuthMethods();
  };

  const getAuthOnline = async () => {
    return pb.collection("users").authRefresh();
  };
  const getAuthState = async () => {
    return pb.authStore.isValid;
  };

  const login = async (email: string, password: string) => {
    return await pb.collection("users").authWithPassword(email, password);
  };

  const logout = async () => {
    return pb.authStore.clear();
  };

  const register = async (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    let user: UserRequest = { email, password, passwordConfirm };
    return await pb.collection("users").create(user);
  };

  return {
    login,
    logout,
    register,
    listAuthOptions,
    getAuthOnline,
    getAuthState,
  };
}
