import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "タイトルは3文字以上で入力してください")
    .max(255, "タイトルは255文字以内で入力して下さい"),
  content: z
    .string()
    .min(10, "内容は10文字以上で入力してください")
    .max(20000, "内容は20,000文字以内で入力してください"),
  topImage: z.instanceof(File).nullable().optional(),
});
