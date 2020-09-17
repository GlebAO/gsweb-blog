import React from "react";

interface PostsListsLyaoutInterface {
    left: JSX.Element | null
    center: JSX.Element | null
    right: JSX.Element | null
}


const PostsListLayout:React.FC<PostsListsLyaoutInterface> = ({ left, center, right }) => {
  return (
    <div className="posts-page row">
      <div className="col-md-2">{left}</div>
      <div className="col-md-7">{center}</div>
      <div className="col-md-3">{right}</div>
    </div>
  );
};

export default PostsListLayout;
