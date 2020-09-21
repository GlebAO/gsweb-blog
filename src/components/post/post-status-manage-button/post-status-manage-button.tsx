import React, { useContext } from "react";
import PostModel, { PostStatus } from "../../../types/PostModel";
import { faPlay, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlogServiceContext } from "../../../context";
import { fetchPost } from "../../../actions/postForm/actions";
import { useDetailedEntity } from "../../../utils/hook-utils";

const PostStatusManageButton: React.FC<{ postSlug: string }> = ({
  postSlug,
}) => {
  const blogServiceContext = useContext(BlogServiceContext);

  const [itemState, stableDispatch] = useDetailedEntity<PostModel>(
    postSlug,
    "posts"
  );

  if (!itemState || !itemState.item) {
    return null;
  }

  const { item, loading, error} = itemState;

  const handleStatusChange = (newStatus: PostStatus) => {
      stableDispatch(
        fetchPost(() =>
          blogServiceContext!.managePost(item.id, {
            status: newStatus,
          })
        )
      );
  };

  return item.status === PostStatus.PENDING ||
    item.status === PostStatus.ACTIVE ? (
      <>
    <button
      type="button"
      title="Сохранить в черновиках (скрыть для всех)"
      className="btn btn-sm btn-outline-secondary text-decoration-none"
      onClick={() => handleStatusChange(PostStatus.DRAFT)}
      disabled={loading}
    >
      <FontAwesomeIcon icon={faSave} />{" "}
      <span className="d-none d-md-inline">
        {loading ? "Сохранение..." : "В черновик"}
      </span>
    </button>
    {error && <span className="text-danger">{error}</span>}
    </>
  ) : (
    <>
    <button
      type="button"
      title="Опубликовать пост"
      className="btn btn-sm btn-primary text-decoration-none"
      onClick={() => handleStatusChange(PostStatus.PENDING)}
      disabled={loading}
    >
      <FontAwesomeIcon icon={faPlay} />{" "}
      <span className="d-none d-md-inline">
        {loading ? "Сохранение..." : "Опубликовать"}
      </span>
    </button>
    {error && <span className="text-danger">{error}</span>}
    </>
  );
};

export default PostStatusManageButton;
