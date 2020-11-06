import React, { useContext, useMemo } from "react";
import PostModel, { PostStatus, postStatuses } from "../../../types/PostModel";
import ActiveDropdown from "../../common/active-dropdown";
import { useDetailedEntity } from "../../../utils/hook-utils";
import { BlogServiceContext } from "../../../context";
import { fetchPost } from "../../../actions/postForm/actions";
import config from "../../../config";
import { useAppContext } from "../../../reducers";

const PostStatusDropdown: React.FC<{
  currentStatus: PostStatus;
  post: PostModel;
}> = ({ currentStatus, post }) => {
  const blogServiceContext = useContext(BlogServiceContext);
  const { getUserInfo } = useAppContext();
  const { sub: userId } = getUserInfo();

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
    config.detailedEntities.POSTS
  );

  let initialState: {
    initial?: boolean;
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

  //remove Status PENDING for own posts
  const statusArray = useMemo(
   () => {
      if (userId === post.userId) {
        return postStatuses.filter(
          (status) => status.val !== PostStatus.PENDING
        );
      }
      return postStatuses;
    },
    [post.userId, userId]
  );


  return (
    <>
      <ActiveDropdown
        disabled={loading}
        items={statusArray}
        selected={status}
        onChange={handleStatusDropdownChange}
        classes={getStatusColor(status)}
      />
      {renderHint()}
    </>
  );
};

export default PostStatusDropdown;
