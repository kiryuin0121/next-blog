import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBox from "../post/SearchBox";

const PublicHeader = () => {
  return (
    <>
      <header className="border-b-2">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-2xl font-bold`}
                  >
                    NEXT BLOG
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <SearchBox />
            <Button
              asChild
              variant={"outline"}
              size={"sm"}
              className="p-2 border-black/75 bg-black hover:bg-[#19d1ff] text-white w-[70px]"
            >
              <Link href={"/regster"}>新規登録</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              size={"sm"}
              className="p-2 border-black/75 bg-black hover:bg-[#19d1ff] text-white w-[70px]"
            >
              <Link href={"/login"}>ログイン</Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default PublicHeader;
