import { prisma } from "./prisma";

export const getOwnPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};
export const getOwnPost = async (postId: string, userId: string) => {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};
