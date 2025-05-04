"use client";
import React, { useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUser } from "@/lib/actions/createUser";
import Link from "next/link";
import { userSchema } from "@/validations/register";
import { ZodError } from "zod";

const RegisterForm = () => {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  const [clientError, setClientError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      switch (name) {
        case "name":
          userSchema.pick({ name: true }).parse({ name: value });
          break;
        case "email":
          userSchema.pick({ email: true }).parse({ email: value });
          break;
        case "password":
          userSchema.pick({ password: true }).parse({ password: value });
          break;
        case "confirmPassword":
          userSchema
            .pick({ confirmPassword: true })
            .parse({ confirmPassword: value });
        default:
          break;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors[0].message || "";
        setClientError((prev) => {
          return { ...prev, [name]: errorMessage };
        });
      }
    }
  };
  return (
    <>
      <Card className="shadow-xl px-16 py-8">
        <CardHeader className="text-center text-[35px] mb-1">
          <CardTitle>NEXT BLOG</CardTitle>
        </CardHeader>
        <CardContent className="w-[280px]">
          <form action={formAction}>
            <div className="mb-1">
              <Label
                htmlFor="name"
                className="text-black/95 font-normal text-sm"
              >
                名前
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="h-8 outline-none rounded-sm border-[#565656]/45 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
                onBlur={blurHandler}
              />
            </div>
            <div className="text-center h-4 mb-2">
              {clientError.name && (
                <p className="text-xs text-red-500">{clientError.name}</p>
              )}
              {state.errors.name && (
                <p className="text-xs text-red-500">
                  {state.errors.name.join(",")}
                </p>
              )}
            </div>
            <div className="mb-1">
              <Label
                htmlFor="email"
                className="text-black/95  font-normal text-sm"
              >
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="h-8 outline-none rounded-sm border-[#565656]/45 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
                onBlurCapture={blurHandler}
              />
            </div>
            <div className="text-center h-4 mb-2">
              {clientError.email && (
                <p className="text-xs text-red-500">{clientError.email}</p>
              )}
              {state.errors.email && (
                <p className="text-xs text-red-500">
                  {state.errors.email.join(",")}
                </p>
              )}
            </div>
            <div className="mb-1">
              <Label
                htmlFor="password"
                className="text-black/95 text-sm font-normal"
              >
                パスワード
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-8 outline-none rounded-sm border-[#565656]/45 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
                onBlur={blurHandler}
              />
            </div>
            <div className="text-center h-4 mb-2">
              {clientError.password && (
                <p className="text-xs text-red-500">{clientError.password}</p>
              )}
              {state.errors.password && (
                <p className="text-xs text-red-500">
                  {state.errors.password.join(",")}
                </p>
              )}
            </div>
            <div className="mb-1">
              <Label
                htmlFor="confirmPassword"
                className="text-black/95 text-sm font-normal"
              >
                パスワード(確認用)
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="h-8 outline-none rounded-sm border-[#565656]/45 focus:border-none focus:ring-[2px] focus:ring-[#19d1ff]"
                onBlur={blurHandler}
              />
            </div>
            <div className="text-center h-4 mb-2">
              {clientError.confirmPassword && (
                <p className="text-xs text-red-500">
                  {clientError.confirmPassword}
                </p>
              )}
              {state.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {state.errors.confirmPassword.join(",")}
                </p>
              )}
            </div>
            <div className="text-center h-4 mb-2">
              {state.errors.serverError && (
                <p className="text-xs text-red-500">
                  {state.errors.serverError.join(",")}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center items-center space-y-2">
              <Button
                type="submit"
                className="w-[150px] border-1 border-black hover:bg-[#19d1ff] hover:text-black hover:border-black"
              >
                新規登録
              </Button>
              <Link
                href={"/login"}
                className="text-sm border-b border-[#565656]/75 hover:text-[#19d1ff] hover:border-[#19d1ff]"
              >
                ログイン
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterForm;
