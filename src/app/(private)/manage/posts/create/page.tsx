"use client";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TextAreaAutoSize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { createPost } from "@/lib/actions/createPost";
import "highlight.js/styles/github.css";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
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
  const [state, formAction] = useActionState(createPost, initState);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setContentLength(e.target.value.length);
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="text-2xl font-bold mb-4">新規記事作成(Markdown対応)</div>
      <form action={formAction} className="space-y-4">
        <div className="ml-2">
          <Label htmlFor="title" className="text-md">
            タイトル
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            className="focus:ring-2"
          />
          {state.errors.title && (
            <p className="text-xs text-red-500">
              {state.errors.title.join(",")}
            </p>
          )}
        </div>
        <div className="ml-2">
          <Label htmlFor="topImage" className="text-md">
            トップ画像
          </Label>
          <Input
            id="topImage"
            name="topImage"
            type="file"
            accept="image/*"
            className="text-[#565656] focus:ring-2"
          />
          {state.errors.topImage && (
            <p className="text-xs text-red-500">
              {state.errors.topImage.join(",")}
            </p>
          )}
        </div>
        <div className="ml-2">
          <Label htmlFor="content" className="text-md">
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
          {state.errors.topImage && (
            <p className="text-xs text-red-500">
              {state.errors.topImage.join(",")}
            </p>
          )}
        </div>
        <div className="mr-2 text-right text-[#565656]">
          文字数:{contentLength}
        </div>
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
              記事を作成
            </Button>
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

export default CreatePage;
