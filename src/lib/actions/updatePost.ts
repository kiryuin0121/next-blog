"use server";
import { postSchema } from "@/validations/post";
import { saveImage } from "../utils/image";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

type State = {
  success: boolean;
  errors: {
    title?: string[];
    topImage?: string[];
    content?: string[];
    serverError?: string[];
  };
};
export const updatePost = async (
  _state: State,
  formData: FormData
): Promise<State> => {
  // データ取得
  const postId = formData.get("postId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = (formData.get("published") == "true") as boolean;
  const currentImageUrl = formData.get("currentImage") as string;

  let topImage = currentImageUrl;
  const topImageData = formData.get("topImage");
  if (
    topImageData instanceof File &&
    topImageData.size > 0 &&
    topImageData.name !== "undefined"
  ) {
    const nextImageUrl = await saveImage(topImageData);
    if (!nextImageUrl) {
      return {
        success: false,
        errors: { topImage: ["画像のアップロードに失敗しました"] },
      };
    }
    topImage = nextImageUrl;
  }

  //バリデーション
  const validationResult = postSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    const { fieldErrors } = validationResult.error.flatten();
    return {
      success: false,
      errors: {
        title: fieldErrors.title,
        topImage: fieldErrors.topImage,
        content: fieldErrors.content,
      },
    };
  }

  // db更新
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      topImage,
      published,
    },
  });
  //リダイレクト
  redirect("/dashboard");
};
