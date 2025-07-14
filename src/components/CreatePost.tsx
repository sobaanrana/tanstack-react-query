// CreatePost.tsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostType } from "../types";
import { useNavigate } from "react-router-dom";

const createPost = async (newPost: Omit<PostType, "id">): Promise<PostType> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["posts"]);
    // },
    // If you call invalidateQueries (in onSuccess), React Query will refetch the posts from the server—but the new post isn’t actually on the server, so your optimistic update will be lost and the UI will revert to the original list.

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<PostType[]>(["posts"]);

      // Optimistically update the cache
      queryClient.setQueryData<PostType[]>(["posts"], (old = []) => [
        { id: Date.now(), ...newPost }, // Fake id!
        ...old,
      ]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
  });

  //   const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ title, body });
    setTitle("");
    setBody("");
    // navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
