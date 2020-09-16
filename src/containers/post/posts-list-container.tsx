import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../reducers";
import { Spinner } from "../../components/common/spinner";
import PostsList from "../../components/post/posts-list";
import { BlogServiceContext } from "../../context";
import ShowMoreButton from "../../components/common/show-more-button";

import { fetchEntityItems, entityItemsShowMore } from "../../actions/entities/actions"
import ResponseErrorIndicator from "../../components/common/response-error-indicator";

const PostsListContainer = () => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const { entities: { publicPosts } } = state;
  const page = publicPosts ? publicPosts.page : 1;

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchEntityItems('publicPosts', blogService.getPosts, page));
    }
  }, [stableDispatch, blogService, page]);

  if(!publicPosts) {
    return null;
  }

  const { items:posts, total, perPage, loading, error } = publicPosts;

  if (error) {
    return <ResponseErrorIndicator error={error} />
  }

  if (!loading && total === 0 && posts.length === 0) {
    return <p>Нет ни одного поста</p>;
  }

  const handleShowMoreClick = () => {
    dispatch(entityItemsShowMore('publicPosts'));
  };

  return (
    <div className="posts-list-container">
      <div className="mb-2">
        <strong>Записи</strong>
      </div>
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
