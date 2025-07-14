import "./App.css";
import CreatePost from "./components/CreatePost";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import PostById from "./components/PostById";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Post />,
    // loader: postsLoader, // Prefetches data
    children: [
      {
        path: "create",
        element: <CreatePost />,
        // action: createPostAction, // Handles form posts
      },
    ],
  },
  {
    path: "post/:id",
    element: <PostById />,
    // loader: postsLoader, // Prefetches data
  },

  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
