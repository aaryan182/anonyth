import { AppBar } from "./AppBar";
import { Post } from "../hooks";

export const FullPost = ({ post }: { post: Post }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-5">
          <div className="col-span-8 ">
            <div className="text-3xl font-extrabold">{post.title}</div>
            <div className="text-slate-400 pb-5">
              Posted on 2nd November 2024
            </div>
            <div>{post.content}</div>
          </div>
          <div className="col-span-4 ">
            Author
            <div className="text-2xl">{post.author.name || "Anonymous"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
