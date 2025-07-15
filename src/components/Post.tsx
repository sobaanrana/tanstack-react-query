import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../types";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const fetchPosts = async (page: number): Promise<PostType[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return res.json();
};

const Post = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching, isPreviousData } = useQuery<
    PostType[]
  >({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    staleTime: 5000, // 5 seconds
    keepPreviousData: true, // So previous page data stays during transition
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

      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={isPreviousData || (data && data.length < 10)}
      >
        Next
      </button>
    </div>
  );
};

export default Post;
