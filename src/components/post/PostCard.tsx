import { Post } from "@/app/types/post";
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

const PostCard = ({ post }: { post: Post }) => {
  return (
    <>
      <Link href={`/posts/${post.id}`}>
        <Card className="pt-0 roundex-md hover:shadow-xl overflow-hidden">
          {post.topImage ? (
            <div className="relative w-full h-48">
              <Image
                src={post.topImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          ) : (
            <div className="bg-gray-300 w-full h-48"></div>
          )}
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-black/90">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between text-[#565656]">
            <p>{post.author.name}</p>
            <p>
              {formatDistanceToNow(new Date(post.createdAt), { locale: ja })}前
            </p>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default PostCard;
