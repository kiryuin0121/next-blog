"use server";
import { registerSchema } from "@/validations/register";
import { prisma } from "../prisma";
import * as bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
type State = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    serverError?: string[];
  };
};
export const createUser = async (
  _state: State,
  formData: FormData
): Promise<State> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const varidationResult = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });
  if (!varidationResult.success) {
    const { fieldErrors } = varidationResult.error.flatten();
    return {
      success: false,
      errors: {
        name: fieldErrors.name,
        email: fieldErrors.email,
        password: fieldErrors.password,
        confirmPassword: fieldErrors.confirmPassword,
      },
    };
  }

  const userIsExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userIsExist) {
    return {
      success: false,
      errors: {
        email: ["このメールアドレスはすでに登録されています"],
      },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log("hashError", error);
    return {
      success: false,
      errors: {
        serverError: ["新規登録に失敗しました"],
      },
    };
  }

  try {
    await signIn("credentials", { redirect: false, email, password });
  } catch (error) {
    console.log("signInError", error);
    return {
      success: false,
      errors: {
        serverError: ["ログイン処理に失敗しました"],
      },
    };
  }
  redirect("/dashboard");
  // return {
  //   success: true,
  //   errors: {},
  // };
};
