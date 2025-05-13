import { Post } from "@/types/post";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { normalizeImagePath } from "@/lib/topImage";

const PostCard = ({ post }: { post: Post }) => {
  const topImageUrl = post.topImage ? normalizeImagePath(post.topImage) : null;
  return (
    <>
      <Card className="pt-0 roundex-md hover:shadow-xl overflow-hidden">
        <Link href={`/posts/${post.id}`}>
          {topImageUrl ? (
            <div className="relative w-full h-48">
              <Image
                src={topImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          ) : (
            <div className="bg-gray-300 w-full h-48"></div>
          )}
          <CardHeader className="mt-8">
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
          </CardHeader>
        </Link>
        <CardContent className="line-clamp-2 text-sm text-black/90">
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
        <CardFooter className="flex justify-between text-[#565656]">
          <p>{post.author.name}</p>
          <p>
            {formatDistanceToNow(new Date(post.createdAt), { locale: ja })}前
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
