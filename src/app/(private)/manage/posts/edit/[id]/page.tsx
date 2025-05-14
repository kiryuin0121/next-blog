import { auth } from "@/auth";
import EditPostForm from "@/components/post/EditPostForm";
import { getOwnPost } from "@/lib/ownPost";
import { Post } from "@/types/post";
import { notFound } from "next/navigation";
import React from "react";

type Params = {
  params: Promise<{ id: string }>;
};
const EditPage = async ({ params }: Params) => {
  const { id: postId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("不正なリクエストです");
  const post = (await getOwnPost(postId, userId)) as Post;
  if (!post) notFound();
  return <EditPostForm post={post} />;
};

export default EditPage;
