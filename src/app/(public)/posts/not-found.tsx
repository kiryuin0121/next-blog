import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-4 gap-8">
      <div className="text-center">
        <p className="text-2xl mb-4">お探しの記事が見つかりませんでした</p>
        <p className="text-sm text-[#565656]">
          記事が存在しないか、すでに削除された可能性があります。
        </p>
      </div>
      <div>
        <Button
          asChild
          className="border-2 py-4 px-4 hover:text-black hover:border-black hover:bg-[#19d1ff]"
        >
          <Link href={"/"}>記事一覧へ戻る</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
