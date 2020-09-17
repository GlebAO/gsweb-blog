import React, { useContext, useLayoutEffect, useCallback } from "react";

import { AppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";

import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { Spinner } from "../../components/common/spinner";
import PostView from "../../components/post/post-view";
import ResponseErrorIndicator from "../../components/common/response-error-indicator";

interface PostContainerProps {
  slug: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ slug }) => {
  const { state, dispatch, isAuthenticated } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  const authenticated = isAuthenticated(); 

  useLayoutEffect(() => {
    if (blogService) {
      //allows user to view his own post if it's on moderation
      const endpoint = authenticated 
        ? () => blogService.getOwnPostBySlug(slug)
        : () => blogService.getPostBySlug(slug);

      stableDispatch(fetchDetailedEntityItem("posts", slug, endpoint));
    }
  }, [slug, stableDispatch, blogService, authenticated]);

  const {
    detailedEntities: { posts },
  } = state;

  if (posts === undefined || posts[slug] === undefined) {
    return null;
  }

  const { item: postData, loading, error } = posts[slug];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ResponseErrorIndicator error={error} />;
  }

  if (postData) {
    return <PostView post={postData} />;
  }

  return <div>Не удалось загрузить запись</div>;
};

export default PostContainer;
