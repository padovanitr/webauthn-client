import { AuthedStorageKey, UserIdStorageKey } from "@/contexts/authContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { ExternalToast } from "sonner";

interface PostLoginArguments {
  response: {
    ok: boolean;
    userId: string;
    message: string;
  };
  router: AppRouterInstance;
  setAuth: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  user?: {
    name?: string;
    email: string;
    password: string;
  };
  toast: (
    message: React.ReactNode,
    data?: ExternalToast | undefined
  ) => string | number;
}

export function postLogin({
  response,
  setAuth,
  setId,
  router,
  user,
  toast,
}: PostLoginArguments) {
  if (response.ok) {
    setAuth(true);
    setId(response.userId);
    localStorage.setItem(AuthedStorageKey, String(true));
    localStorage.setItem(UserIdStorageKey, response.userId);
    router.push("/");

    // Credentials Management API storage
  } else {
    toast(response.message);
  }
}
