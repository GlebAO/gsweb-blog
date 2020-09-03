import React, { useContext, useLayoutEffect, useCallback } from "react";

import { AppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";
import { fetchPostBySlug } from "../../actions/postContent/actions";

import { Spinner } from "../../components/common/spinner";
import PostView from "../../components/post/post-view";
import { Redirect } from "react-router-dom";


interface PostContainerProps {
  slug: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ slug }) => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useLayoutEffect(() => {
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
    return <Redirect to="/404" />;
  }

  if (postData) {
    return <PostView post={postData} />;
  }

  return <div>Не удалось загрузить запись</div>;
};

export default PostContainer;
