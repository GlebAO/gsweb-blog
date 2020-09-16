import React, { useContext, useLayoutEffect, useCallback } from "react";

import { AppContext } from "../../reducers";
import { BlogServiceContext } from "../../context";

import { fetchDetailedEntityItem } from "../../actions/detailedEntities/actions";
import { Spinner } from "../../components/common/spinner";
import PostView from "../../components/post/post-view";
import { Redirect } from "react-router-dom";
import { FormAlert } from "../../components/form";


interface PostContainerProps {
  slug: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ slug }) => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);

  const stableDispatch = useCallback(dispatch, []);

  useLayoutEffect(() => {
    if (blogService) {
      stableDispatch(fetchDetailedEntityItem("posts", slug, () => blogService.getPostBySlug(slug)));
    }
  }, [slug, stableDispatch, blogService]);


  const {
    detailedEntities: { posts },
  } = state;

  if(posts === undefined || posts[slug] === undefined) {
    return null
  }

  const {
     item:postData, loading, error
  } = posts[slug];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <FormAlert text={error.message} success={false}/>
  }

  if (postData) {
    return <PostView post={postData} />;
  }

  return <div>Не удалось загрузить запись</div>;
};

export default PostContainer;
