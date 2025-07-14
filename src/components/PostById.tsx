import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

export const PostById = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id], // Include id for caching
    queryFn: () => fetchPosts(id),
  });

  if (isLoading) return <p> Loading...</p>;

  if (error) return <p> Error occured: {error.message}</p>;

  return <> {data.title}</>;
};
