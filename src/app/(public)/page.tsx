import { getPosts, searchPosts } from "@/lib/post";
import PostCard from "@/components/post/PostCard";
import { Post } from "../types/post";

type SearchParams = {
  searchParams: { query?: string };
};
export default async function PublicPage({ searchParams }: SearchParams) {
  const search = searchParams.query;
  const posts = search
    ? ((await searchPosts(search)) as Post[])
    : ((await getPosts()) as Post[]);
  return (
    <>
      <div className="container mx-auto px-4 py-8 grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
