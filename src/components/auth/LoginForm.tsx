"use client";
import React, { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authenticate } from "@/lib/actions/authenticate";

const LoginForm = () => {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  return (
    <Card className="shadow-xl px-8 py-12">
      <CardHeader className="text-center text-[28px] mb-4">
        <CardTitle>NEXT BLOG</CardTitle>
      </CardHeader>
      <CardContent className="w-[280px]">
        <form action={formAction}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="text-black/95  font-normal text-xs"
            >
              メールアドレス
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="h-7 outline-none rounded-sm border-[#565656]/50 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
            />
          </div>
          <div className="mb-2">
            <Label
              htmlFor="password"
              className="text-black/95 text-xs font-normal"
            >
              パスワード
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="h-7 outline-none rounded-sm border-[#565656]/50 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
            />
          </div>
          <div className="text-center h-4 mb-2">
            {errorMessage && (
              <p className="text-xs text-red-500">{errorMessage}</p>
            )}
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <Button
              type="submit"
              className="w-[120px] border-1 border-black hover:bg-[#19d1ff] hover:text-black hover:border-black"
            >
              ログイン
            </Button>
            <Link
              href={"/register"}
              className="text-xs border-b border-[#565656]/75 hover:text-[#19d1ff] hover:border-[#19d1ff]"
            >
              新規登録
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
