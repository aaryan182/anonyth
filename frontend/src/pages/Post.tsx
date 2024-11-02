import { FullPost } from "../components/FullPost";
import { usePost } from "../hooks";
import { useParams } from "react-router-dom";

export const Post = () => {
  const { id } = useParams();
  const { loading, Post } = usePost({ id: id as string });
  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div>
      {Post === undefined ? (
        <div>Post not found</div>
      ) : (
        <FullPost post={Post} />
      )}
    </div>
  );
};
