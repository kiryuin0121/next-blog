import { z } from "zod";
export const userSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(30, "名前は30文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .min(6, "メールアドレスは6文字以上で入力してください")
    .max(128, "メールアドレスは128文字以内で入力してください")
    .email(),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上で入力してください")
    .max(128, "パスワードは128文字以内で入力してください"),
  confirmPassword: z
    .string()
    .min(1, "パスワード(確認用)を入力してください")
    .min(8, "パスワード(確認用)は8文字以上で入力してください")
    .max(128, "パスワード(確認用)は128文字以内で入力してください"),
});
export const registerSchema = userSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  }
);
