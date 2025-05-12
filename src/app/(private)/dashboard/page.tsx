import { auth } from "@/auth";
import OperationMenu from "@/components/post/OperationMenu";
import { Button } from "@/components/ui/button";
import { getOwnPosts } from "@/lib/ownPost";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) throw new Error("不正なリクエストです");

  const posts = await getOwnPosts(userId);
  return (
    <div className="container mx-auto px-12 py-12">
      <div className="flex justify-between mb-3 pl-2">
        <p className="text-2xl font-semibold">記事一覧</p>
        <Button
          asChild
          variant={"outline"}
          className="px-3 py-2 border-black/75 bg-black hover:bg-[#19d1ff] text-white"
        >
          <Link href={"/manage/posts/create"}>新規記事作成</Link>
        </Button>
      </div>
      <table className="w-full table-auto  border-separate border-spacing-0">
        <thead>
          <tr className="text-center bg-black/90 text-white text-md">
            <th className="border-[#565656] border-[1px]  p-2 rounded-tl-md">
              タイトル
            </th>
            <th className="border-[#565656] border-[1px]  p-2">
              表示 / 非表示
            </th>
            <th className="border-[#565656] border-[1px] p-2">更新日時</th>
            <th className="border-[#565656] border-[1px]  p-2 rounded-tr-md">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => {
            const isLast = i === posts.length - 1;
            return (
              <tr key={post.id} className="text-center">
                <td className={`border p-2 ${isLast ? "rounded-bl-md" : ""}`}>
                  {post.title}
                </td>
                <td className="border p-2">
                  {post.published ? "表示" : "非表示"}
                </td>
                <td className="border p-2">
                  {format(post.updatedAt, "yyyy-MM-dd")}
                </td>
                <td className={`border p-2 ${isLast ? "rounded-br-md" : ""}`}>
                  <OperationMenu postId={post.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
