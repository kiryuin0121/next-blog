import { prisma } from "./prisma";

export const getUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
