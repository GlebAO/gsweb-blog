import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../reducers";
import { fetchPosts, postsShowMore } from "../../actions/postsList/actions";
import { Spinner } from "../../components/common/spinner";
import PostsList from "../../components/post/posts-list";
import { BlogServiceContext } from "../../context";
import ShowMoreButton from "../../components/common/show-more-button";

const PostsListContainer = () => {
  const { state, dispatch } = useContext(AppContext);
  const blogService = useContext(BlogServiceContext);
  const stableDispatch = useCallback(dispatch, []);

  const {
    postsList: { posts, total, page, perPage, loading, error },
  } = state;

  useEffect(() => {
    if (blogService) {
      stableDispatch(fetchPosts(blogService, page));
    }
  }, [stableDispatch, blogService, page]);

  if (error) {
    return <p>Error</p>;
  }

  if (!loading && total === 0 && posts.length === 0) {
    return <p>Нет ни одного поста</p>;
  }

  const handleShowMoreClick = () => {
    dispatch(postsShowMore());
  };

  return (
    <div className="posts-list-container">
      <div className="list-info text-right mb-2">
        Записей:{" "}
        <span className="badge rounded-pill bg-secondary">{total}</span>
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
