import React from "react";
import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Params = {
  params: Promise<{ id: string }>;
};
const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="pt-0 overflow-hidden">
          <div className="w-full h-64 lg:h-96 relative">
            {post.topImage ? (
              <Image
                fill
                src={post.topImage}
                alt={post.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="max-w-3xl h-96 bg-[#565656]"></div>
            )}
          </div>
          <div className="text-sm text-[#565656] flex justify-end gap-4 mr-8">
            <p>投稿者:{post.author.name}</p>
            <p>
              投稿日:
              {format(new Date(post.createdAt), "yyyy/MM/dd", {
                locale: ja,
              })}
            </p>
          </div>

          <CardHeader>
            <CardTitle className="text-xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PostPage;
