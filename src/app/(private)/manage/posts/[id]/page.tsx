import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOwnPost } from "@/lib/ownPost";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
type Params = {
  params: Promise<{ id: string }>;
};
const ShowPage = async ({ params }: Params) => {
  const { id: postId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("不正なリクエストです");
  const post = await getOwnPost(postId, userId);
  if (!post) notFound();

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
            <div className="prose">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ShowPage;
