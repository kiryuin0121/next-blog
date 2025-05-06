import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const OperationMenu = ({ postId }: { postId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-md">・・・</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-2 cursor-pointer hover:font-bold">
          <Link href={`/posts/${postId}`}>詳細</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer hover:font-bold">
          <Link href={`/posts/${postId}/edit`}>編集</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 text-red-600 cursor-pointer hover:font-bold">
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OperationMenu;
