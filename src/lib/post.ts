import { prisma } from "./prisma";

export const getPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getPost = async (id: string) => {
  return await prisma.post.findFirst({
    where: { id },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
};
