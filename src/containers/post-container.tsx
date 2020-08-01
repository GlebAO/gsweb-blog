import React, { useContext, useEffect, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { PostPage } from "../components/pages";

import { AppContext } from "../reducers";
import BlogServiceContext from "../components/blog-service-context";
import { fetchPostBySlug } from "../actions/postsList/actions";

interface MatchParams {
  slug: string;
}

//interface PostContainerProps extends RouteComponentProps<{slug: string}> {

//}

const PostContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const { dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const { slug } = match.params;

  useEffect(() => {
    if( blogService ) {
      stableDispatch(fetchPostBySlug(slug, blogService));
    }
  }, [slug, stableDispatch, blogService]);

  return <PostPage />;
};

export default PostContainer;
