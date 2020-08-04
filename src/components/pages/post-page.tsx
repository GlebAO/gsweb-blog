import React from "react";
import { RouteComponentProps } from "react-router";
import PostContainer from "../../containers/post-container";

interface MatchParams {
  slug: string;
}

const PostPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { slug } = match.params;

  return (
    <div className="post-page">
      <div className="row">
        <div className="col-md-9">
          <PostContainer slug={slug} />
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default PostPage;
