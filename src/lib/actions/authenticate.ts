"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const authenticate = async (
  _state: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return "**メールアドレスまたはパスワードが間違っています**";
    }
    return "ログインに失敗しました";
  }
};
