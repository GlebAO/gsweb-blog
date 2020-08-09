import React, { useContext, useEffect, useCallback } from "react";

import { AppContext } from "../reducers";
import { BlogServiceContext } from "../context";
import { fetchPostBySlug } from "../actions/postContent/actions";

import Spinner from "../components/common/spinner";
import ErrorIndicator from "../components/common/error-indicator";
import PostView from "../components/post/post-view";

interface PostContainerProps {
  slug: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ slug }) => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchPostBySlug(slug, blogService));
    }
  }, [slug, stableDispatch, blogService]);

  const {
    postContent: { postData, loading, error },
  } = state;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  if (postData) {
    return <PostView post={postData} />;
  }

  return <div>Не удалось загрузить запись</div>;
};

export default PostContainer;
