import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../types";
import { Link, Outlet } from "react-router-dom";

const fetchPosts = async (): Promise<PostType[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return res.json();
};

const Post = () => {
  const { data, isLoading, error } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5000, // 5 seconds
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) return <p>Error occured: {error.message}</p>;

  return (
    <div>
      <Outlet />
      {/* This Outlet will render the child routes, such as CreatePost */}
      {data?.map((post, index) => (
        <Link to={`/post/${post.id}`} key={index}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Link>
      ))}
    </div>
  );
};

export default Post;
