import React, { useCallback, useContext, useState, useRef } from "react";
import { UserStatus, userStatuses } from "../../types/UserModel";
import ActiveDropdown from "../common/active-dropdown";
import { useRequest } from "../../utils/hook-utils";
import { BlogServiceContext } from "../../context";

const StatusDropdown: React.FC<{ currentStatus: UserStatus; userId: number }> = ({
  currentStatus,
  userId,
}) => {
  const blogService = useContext(BlogServiceContext);

  const [status, setStatus] = useState(currentStatus);

  const disablefirstUpdate = useRef(true);

  const useChangeUserStatus = (newStatus: UserStatus) => {
    const request = useCallback(() => {
      const values = { status: newStatus };
      return blogService!.updateUser(userId, values);
    }, [newStatus]);

    return useRequest(request, disablefirstUpdate);
  };

  const dataState = useChangeUserStatus(status);

  const { loading, data, error } = dataState;

  const handleStatusDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = +event.target.value;

    switch (selectedValue) {
      case UserStatus.ACTIVE:
        setStatus(UserStatus.ACTIVE);
        break;
      case UserStatus.DELETED:
        setStatus(UserStatus.DELETED);
        break;
      case UserStatus.INACTIVE:
        setStatus(UserStatus.INACTIVE);
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

  const getStatusColor = (userStatus: UserStatus):string => {
    switch (userStatus) {
        case UserStatus.ACTIVE:
          return "text-success"
        case UserStatus.DELETED:
            return "text-danger"
        case UserStatus.INACTIVE:
            return "text-warning"
        default:
            return "text-muted"
      }
  }

  return (
    <>
      <ActiveDropdown
        disabled={loading}
        items={userStatuses}
        selected={status}
        onChange={handleStatusDropdownChange}
        classes={getStatusColor(status)}
      />
      {renderHint()}
    </>
  );
};

export default StatusDropdown;
