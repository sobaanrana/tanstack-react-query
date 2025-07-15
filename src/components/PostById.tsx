import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

const fetchPost = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

const PostById = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id], // Include id for caching
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return <p> Loading...</p>;

  if (error) return <p> Error occured: {error.message}</p>;

  return <> {data.title}</>;
};

export default PostById;
