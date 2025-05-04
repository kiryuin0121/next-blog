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

export const searchPosts = async (search: string) => {
  const searchWords = decodeURIComponent(search)
    .replace(/[\s　]+/g, " ")
    .trim()
    .split(" ");
  const filters = searchWords.map((word) => {
    return {
      OR: [{ title: { contains: word } }, { content: { contains: word } }],
    };
  });
  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
