import { credentialsSchema } from "./validations/credentials";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/user";
import * as bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordIsMatch = await bcrypt.compare(password, user.password);

        return passwordIsMatch ? user : null;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLogin = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/manage");

      // 認証が必要なページにログインしないでアクセスしようとしている場合はログインページにリダイレクト
      if (isProtected && !isLogin) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      // ログインしている状態でログインページにアクセスしようとしている場合はログイン後のページにリダイレクト
      if (isLogin && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});
