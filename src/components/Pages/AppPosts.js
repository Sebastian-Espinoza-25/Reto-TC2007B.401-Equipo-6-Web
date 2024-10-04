import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import PostsView from "../PostsView/PostsView";
import "./AppComun.css";

const AppPosts = () => {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <PostsView />
      </div>
    </div>
  );
};

export default AppPosts;
