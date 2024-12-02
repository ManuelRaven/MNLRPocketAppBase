import {
  type AuthStoreUserRecord,
  type UserRequest,
} from "@/types/custom-types";
import { ref } from "vue";
import { usePb } from "./usePb";

const pb = usePb();

const authModel = ref<AuthStoreUserRecord | null>(null);

pb.authStore.onChange(() => {
  authModel.value = pb.authStore.record as unknown as AuthStoreUserRecord;
  console.log("Auth state changed to: ", authModel.value);
}, true);

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
    authModel,
    login,
    logout,
    register,
    listAuthOptions,
    getAuthOnline,
    getAuthState,
  };
}
