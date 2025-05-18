"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeletePostDialog from "./DeletePostDialog";

const OperationMenu = ({ postId }: { postId: string }) => {
  const [dropdownIsOpen, setDropDownIsOpen] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const onOpenChange = (dialogIsOpen: boolean) => {
    setDialogIsOpen(dialogIsOpen);
    if (!dialogIsOpen) {
      setDropDownIsOpen(false);
    }
  };
  return (
    <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropDownIsOpen}>
      <DropdownMenuTrigger className="text-md">・・・</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-2 cursor-pointer hover:font-bold">
          <Link href={`/manage/posts/${postId}`}>詳細</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer hover:font-bold">
          <Link href={`/manage/posts/${postId}`}>編集</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:font-bold"
          onSelect={() => {
            setDropDownIsOpen(false);
            setDialogIsOpen(true);
          }}
        >
          {dialogIsOpen && (
            <DeletePostDialog
              postId={postId}
              dialogIsOpen={dialogIsOpen}
              onOpenChange={onOpenChange}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OperationMenu;
