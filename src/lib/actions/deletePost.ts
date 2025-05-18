"use server";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
type State = {
  success: boolean;
  errors: {
    serverError?: string[];
  };
};
export const deletePost = async (postId: string): Promise<State> => {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    redirect("/dashboard");
  } catch (error) {
    console.error("画像削除Error", error);
    return {
      success: false,
      errors: {
        serverError: ["記事の削除に失敗しました"],
      },
    };
  }
};
