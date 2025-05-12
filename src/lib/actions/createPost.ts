"use server";
import { postSchema } from "@/validations/post";
import { saveImage } from "../utils/image";
import { auth } from "@/auth";
import { prisma } from "../prisma";

type State = {
  success: boolean;
  errors: {
    title?: string[];
    topImage?: string[];
    content?: string[];
    serverError?: string[];
  };
};
export const createPost = async (
  _state: State,
  formData: FormData
): Promise<State> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageData = formData.get("topImage") as File;
  const topImage = topImageData ? await saveImage(topImageData) : null;
  if (topImageData && !topImage) {
    return {
      success: false,
      errors: { topImage: ["画像のアップロードに失敗しました"] },
    };
  }
  const validationResult = postSchema.safeParse({ title, content });
  if (!validationResult.success) {
    const { fieldErrors } = validationResult.error.flatten();
    return {
      success: false,
      errors: {
        title: fieldErrors.title,
        content: fieldErrors.content,
      },
    };
  }
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      errors: {
        serverError: ["不正なリクエストです"],
      },
    };
  }
  await prisma.post.create({
    data: {
      title,
      content,
      topImage,
      authorId: userId,
    },
  });
  return {
    success: true,
    errors: {},
  };
};
