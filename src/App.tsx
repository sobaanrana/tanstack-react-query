import "./App.css";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import PostById from "./components/PostById";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
      <CreatePost />
      {/* <Post /> */}
      <PostById id={3} />
    </>
  );
}

export default App;
