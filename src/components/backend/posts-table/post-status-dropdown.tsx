import React, { useCallback, useContext, useState, useRef } from "react";
import PostModel, { PostStatus, postStatuses } from "../../../types/PostModel";
import ActiveDropdown from "../../common/active-dropdown";
import { useRequest } from "../../../utils/hook-utils";
import { BlogServiceContext } from "../../../context";

const PostStatusDropdown: React.FC<{ currentStatus: PostStatus; post: PostModel }> = ({
  currentStatus,
  post,
}) => {
  const blogService = useContext(BlogServiceContext);

  const [status, setStatus] = useState(currentStatus);

  const disablefirstUpdate = useRef(true);

  const useChangePostStatus = (newStatus: PostStatus) => {
    const request = useCallback(() => {
      const values = { status: newStatus };
      return blogService!.managePost(post.id, values);
    }, [newStatus]);

    return useRequest(request, disablefirstUpdate);
  };

  const dataState = useChangePostStatus(status);

  const { loading, data, error } = dataState;

  const handleStatusDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = +event.target.value;

    switch (selectedValue) {
      case PostStatus.ACTIVE:
        setStatus(PostStatus.ACTIVE);
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

    if (data && !error) {
      return <span className="text-success">Сохранено</span>;
    }

    if (error) {
      return <span className="text-danger">{error.message}</span>;
    }
  };

  const getStatusColor = (userStatus: PostStatus):string => {
    switch (userStatus) {
        case PostStatus.ACTIVE:
          return "text-success"
        case PostStatus.DRAFT:
            return "text-danger"
        case PostStatus.ARCHIVED:
            return "text-warning"
        default:
            return "text-muted"
      }
  }

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
