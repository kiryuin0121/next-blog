"use client";
import { Post } from "@/types/post";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TextAreaAutoSize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import Image from "next/image";
import { updatePost } from "@/lib/actions/updatePost";
const EditPostForm = ({ post }: { post: Post }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(post.content.length);
  const [topImage, setTopImage] = useState(post.topImage);
  const [published, setPublished] = useState(post.published);
  const [isPreview, setIsPreview] = useState(false);
  type State = {
    success: boolean;
    errors: {
      title?: string[];
      content?: string[];
      topImage?: string[];
      serverError?: string[];
    };
  };
  const initState: State = {
    success: false,
    errors: {},
  };
  const [state, formAction] = useActionState(updatePost, initState);
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setContentLength(e.target.value.length);
  };
  const changeImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const topImageUrl = URL.createObjectURL(file);
      setTopImage(topImageUrl);
    }
  };
  useEffect(() => {
    return () => {
      if (topImage && topImage !== post.topImage) {
        URL.revokeObjectURL(topImage);
      }
    };
  }, [topImage, post.topImage]);

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="text-2xl font-bold mb-4">
        記事を編集する(Markdown対応)
      </div>
      <form action={formAction} className="space-y-4">
        <div className="ml-2">
          <Label htmlFor="title" className="text-md font-semibold">
            タイトル
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            className="focus:ring-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {state.errors.title && (
            <p className="text-xs text-red-500">
              {state.errors.title.join(",")}
            </p>
          )}
        </div>
        <div className="ml-2">
          <Label htmlFor="topImage" className="text-md font-semibold">
            トップ画像
          </Label>
          <Input
            id="topImage"
            name="topImage"
            type="file"
            accept="image/*"
            className="text-[#565656] focus:ring-2"
            onChange={changeImageHandler}
          />
          {topImage && (
            <div className="mt-2">
              <Image
                src={topImage}
                alt={post.title}
                width={0}
                height={0}
                sizes="200px"
                className="w-[200px]"
                priority
              />
            </div>
          )}
          {state.errors.topImage && (
            <p className="text-xs text-red-500">
              {state.errors.topImage.join(",")}
            </p>
          )}
        </div>
        <div className="ml-2">
          <Label htmlFor="content" className="text-md font-semibold">
            内容(Markdown)
          </Label>
          <TextAreaAutoSize
            id="content"
            name="content"
            minRows={8}
            placeholder="Markdown形式で内容を入力してください"
            className="w-full py-2 rounded-sm border focus:ring-2 focus:ring-[#19d1ffd8] focus:outline-none"
            value={content}
            onChange={changeHandler}
          />
          {state.errors.content && (
            <p className="text-xs text-red-500">
              {state.errors.content.join(",")}
            </p>
          )}
        </div>
        <div className="mr-2 text-right text-[#565656]">
          文字数:{contentLength}
        </div>
        <p className="text-md font-semibold">公開設定</p>
        <RadioGroup
          name="published"
          value={published.toString()}
          onValueChange={(value) => setPublished(value === "true")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-one" />
            <Label htmlFor="publish-one">公開</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-two" />
            <Label htmlFor="published-two">非公開</Label>
          </div>
        </RadioGroup>

        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="currentImage" value={post.topImage || ""} />

        <hr></hr>
        <div className="ml-2 flex justify-start gap-4">
          <div>
            <Button
              type="button"
              variant={"outline"}
              className="w-32 p-4 border-black/75 bg-black hover:bg-[#19d1ff] text-white"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? "プレビューを非表示" : "プレビューを表示"}
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              variant={"outline"}
              className="w-32 p-4 border-black/75 bg-black hover:bg-[#19d1ff] text-white"
            >
              記事を更新
            </Button>
            {state.errors.serverError && (
              <p className="text-xs text-red-500">
                {state.errors.serverError.join(",")}
              </p>
            )}
          </div>
        </div>
        {isPreview && (
          <div className="bg-gray/50 border p-4 prose">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPostForm;
