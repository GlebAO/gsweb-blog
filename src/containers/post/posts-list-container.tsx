import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../reducers";
import { Spinner } from "../../components/common/spinner";
import PostsList from "../../components/post/posts-list";
import { BlogServiceContext } from "../../context";
import ShowMoreButton from "../../components/common/show-more-button";

import {
  fetchEntityItems,
  entityItemsShowMore,
} from "../../actions/entities/actions";
import ResponseErrorIndicator from "../../components/common/response-error-indicator";
import config from "../../config";
import { FilterObjectInterface } from "../../reducers/types";

interface PostsListContainerInterface {
  entityKey:string,
  tag?: string;
  endpoint: () => Promise<any>
}

const PostsListContainer: React.FC<PostsListContainerInterface> = ({ entityKey, tag, endpoint }) => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  //save posts-list and posts-for-specific-tag-list separatly in entities state
  const stateKey = `${entityKey}${tag ? "For" + tag : ""}`;
  const { entities } = state;

  const data = entities[stateKey];
  const page = data ? data.page : 1;
  const filter = data ? data.filter : undefined;

  useEffect(() => {
    let filterObject: FilterObjectInterface | undefined = filter;
    if (tag) {
      filterObject = { ...filter, tag };
    }
    if (blogService) {
      stableDispatch(
        fetchEntityItems(
          stateKey,
          endpoint,
          page,
          config.PER_PAGE,
          filterObject
        )
      );
    }
  }, [stableDispatch, blogService, page, stateKey, filter, tag, endpoint]);

  if (!data) {
    return null;
  }

  const { items: posts, total, perPage, loading, error } = data;

  if (error) {
    return <ResponseErrorIndicator error={error} />;
  }

  if (!loading && total === 0 && posts.length === 0) {
    return <p>Нет ни одного поста</p>;
  }

  const handleShowMoreClick = () => {
    dispatch(entityItemsShowMore(stateKey));
  };

  return (
    <div className="posts-list-container">
      <PostsList posts={posts} />
      {loading && <Spinner />}
      <ShowMoreButton
        loading={loading}
        page={page}
        perPage={perPage}
        total={total}
        onClick={handleShowMoreClick}
      />
    </div>
  );
};

export default PostsListContainer;
