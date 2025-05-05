"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const authenticate = async (
  _state: string | undefined,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      return "メールアドレスまたはパスワードが間違っています";
    }
    return "ログインに失敗しました";
  }
  redirect("/dashboard");
};
