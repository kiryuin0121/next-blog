"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);
  useEffect(() => {
    if (debouncedValue) {
      router.push(`/?query=${encodeURIComponent(debouncedValue)}`);
    } else {
      router.push("/");
    }
  }, [debouncedValue, router]);

  return (
    <>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-[200px] lg:[300px] h-8 text-sm placeholder-[#565656] border-[#565656]/75 focus:outline-none focus:border-0 focus:ring-2 focus:[#19d1ff]"
        placeholder="記事を検索..."
      />
    </>
  );
};

export default SearchBox;
