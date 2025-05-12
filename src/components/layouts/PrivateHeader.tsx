import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const PrivateHeader = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/");

  const clickHandler = async () => {
    "use server";
    await signOut({ redirect: false });
    redirect("/");
  };
  return (
    <header className="border-b-2">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={"/dashboard"} className="text-3xl font-bold">
                NEXT BLOG
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="bg-black text-white text-xl font-bold w-12 h-12 rounded-full">
            {session.user?.name?.substring(0, 1)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6">
            <div className="text-center px-4 py-4">
              <DropdownMenuLabel className="text-md text-black/90">
                {session.user?.name}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-[#565656]">
                {session.user?.email}
              </DropdownMenuLabel>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={clickHandler}>
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default PrivateHeader;
