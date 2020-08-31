import React, { useCallback, useContext, useState, useRef } from "react";
import { UserRole, userRoles } from "../../../types/UserModel";
import ActiveDropdown from "../../common/active-dropdown";
import { useRequest } from "../../../utils/hook-utils";
import { BlogServiceContext } from "../../../context";

const RoleDropdown: React.FC<{ currentRole: UserRole; userId: number }> = ({
  currentRole,
  userId,
}) => {
  const blogService = useContext(BlogServiceContext);

  const [role, setRole] = useState(currentRole);

  const disablefirstUpdate = useRef(true);

  const useChangeUserRole = (newRole: UserRole) => {
    const request = useCallback(() => {
      const values = { role: newRole };
      return blogService!.updateUser(userId, values);
    }, [newRole]);

    return useRequest(request, disablefirstUpdate);
  };

  const dataState = useChangeUserRole(role);

  const { loading, data, error } = dataState;

  const handleRoleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case UserRole.ADMIN:
        setRole(UserRole.ADMIN);
        break;
      case UserRole.USER:
        setRole(UserRole.USER);
        break;
      case UserRole.GUEST:
        setRole(UserRole.GUEST);
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

  const getRoleColor = (userRole: UserRole):string => {
    switch (userRole) {
        case UserRole.ADMIN:
          return "text-danger"
        case UserRole.USER:
            return "text-warning"
        case UserRole.GUEST:
            return "text-success"
        default:
            return "text-light"
      }
  }

  return (
    <>
      <ActiveDropdown
        disabled={loading}
        items={userRoles}
        selected={role}
        onChange={handleRoleDropdownChange}
        classes={getRoleColor(role)}
      />
      {renderHint()}
    </>
  );
};

export default RoleDropdown;
