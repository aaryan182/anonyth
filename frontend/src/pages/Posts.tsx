import { AppBar } from "../components/AppBar";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../hooks";

export const Posts = () => {
  const { loading, Posts } = usePosts();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className="justify-center max-w-xl">
            <div className="text-3xl font-bold pt-10">Loading...</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="justify-center">
          {Posts.map((Post: any) => {
            return (
              <PostCard
                key={Post.id}
                id={Post.id}
                title={Post.title}
                content={Post.content}
                authorName={Post.author.name || "Anonymous"}
                publishDate={"14th Mar 2024"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
