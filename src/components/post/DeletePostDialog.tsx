import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/deletePost";

type Props = {
  postId: string;
  dialogIsOpen: boolean;
  onOpenChange: (dropdownIsOpen: boolean) => void;
};
export const DeletePostDialog = ({
  postId,
  dialogIsOpen,
  onOpenChange,
}: Props) => {
  const clickHandler = async () => {
    await deletePost(postId);
  };
  return (
    <AlertDialog open={dialogIsOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>
            本当に記事を削除してもよろしいですか?
            この操作を取り消すことはできません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={clickHandler}>
            記事を削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
