import React, { useContext } from "react";
import PostModel, { PostStatus, postStatuses } from "../../../types/PostModel";
import ActiveDropdown from "../../common/active-dropdown";
import { useDetailedEntity } from "../../../utils/hook-utils";
import { BlogServiceContext } from "../../../context";
import { fetchPost } from "../../../actions/postForm/actions";

const PostStatusDropdown: React.FC<{
  currentStatus: PostStatus;
  post: PostModel;
}> = ({ currentStatus, post }) => {
  const blogServiceContext = useContext(BlogServiceContext);

  //const [status, setStatus] = useState(currentStatus);

  //const disablefirstUpdate = useRef(true);

  //const useChangePostStatus = (newStatus: PostStatus) => {
  //  const request = useCallback(() => {
  //    const values = { status: newStatus };
  //    return blogService!.managePost(post.id, values);
  //  }, [newStatus]);

  //  return useRequest(request, disablefirstUpdate);
  //};

  //const dataState = useChangePostStatus(status);
  //const { loading, data, error } = dataState;

  const [itemState, stableDispatch] = useDetailedEntity<PostModel>(
    post.slug,
    "posts"
  );

  let initialState: {
    initial?: boolean,
    item: PostModel | null;
    loading: boolean;
    error: Error | null;
  } = {
    initial: true,
    item: null,
    loading: false,
    error: null,
  };
  if (itemState && itemState.item) {
    initialState = { ...initialState, ...itemState };
  }
  const { item: data, loading, error, initial } = initialState;
  const status = data ? data.status : currentStatus;

  const setStatus = (newStatus: PostStatus) => {
    stableDispatch(
      fetchPost(() =>
        blogServiceContext!.managePost(post.id, {
          status: newStatus,
        })
      )
    );
  };

  const handleStatusDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = +event.target.value;

    switch (selectedValue) {
      case PostStatus.ACTIVE:
        setStatus(PostStatus.ACTIVE);
        break;
      case PostStatus.PENDING:
        setStatus(PostStatus.PENDING);
        break;
      case PostStatus.DRAFT:
        setStatus(PostStatus.DRAFT);
        break;
      case PostStatus.ARCHIVED:
        setStatus(PostStatus.ARCHIVED);
        break;
      default:
        break;
    }
  };

  const renderHint = () => {
    if (loading) {
      return <span className="text-primary">Сохраняется...</span>;
    }

    if (initial && data && !error) {
      return <span className="text-success">Сохранено</span>;
    }

    if (error) {
      return <span className="text-danger">{error.message}</span>;
    }
  };

  const getStatusColor = (userStatus: PostStatus): string => {
    switch (userStatus) {
      case PostStatus.ACTIVE:
        return "text-success";
      case PostStatus.DRAFT:
        return "text-secondary";
      case PostStatus.PENDING:
        return "text-warning";
      case PostStatus.ARCHIVED:
        return "text-secondary";
      default:
        return "text-muted";
    }
  };

  return (
    <>
      <ActiveDropdown
        disabled={loading}
        items={postStatuses}
        selected={status}
        onChange={handleStatusDropdownChange}
        classes={getStatusColor(status)}
      />
      {renderHint()}
    </>
  );
};

export default PostStatusDropdown;
