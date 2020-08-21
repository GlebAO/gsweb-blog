import React, { useContext, useState, useRef, useLayoutEffect } from "react";
import { AppContext } from "../../../reducers";
import { logout } from "../../../actions/auth/actions";
import { Link } from "react-router-dom";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface dropDownItemProps {
  title: string;
  path: string;
  onClick: () => void
}

interface dropdownContentProps {
  dropdownItems: Array<dropDownItemProps>;
}

const DropdownItem: React.FC<{ item: dropDownItemProps }> = ({ item }) => (
    <Link className="dropdown-item" to={item.path} onClick={ item.onClick }>
      {item.title}
    </Link>
);

const DropdownContent: React.FC<dropdownContentProps> = ({ dropdownItems }) => {
  const { dispatch } = useContext(AppContext);
  return (
    <ul className="dropdown-menu dropdown-menu-right show">
      {dropdownItems.map((item, i) => {
        return (
          <li key={i}>
            <DropdownItem item={item} />
          </li>
        );
      })}
      <li><hr className="dropdown-divider"></hr></li>
      <li>
        <button
          type="button"
          className="dropdown-item"
          onClick={() => dispatch(logout())}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="ml-2">Выйти</span>
        </button>
      </li>
    </ul>
  );
};

const AvatarDropdown = () => {
  const node = useRef<HTMLDivElement>(null);
  const { getUserInfo } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { name } = getUserInfo();

  const dropdownItems = [
    {
      title: "Профиль",
      path: "/profile",
      onClick: () => setDropdownOpen(false)
    },
  ];

  const handleClick = (event: MouseEvent) => {
    if (event.target instanceof Element) {
      if (!node.current?.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node} className="dropdown">
      <button
        type="button"
        className="btn btn-outline-primary d-flex align-items-center dropdown-toggle"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{name}</span>
      </button>

      {dropdownOpen && <DropdownContent dropdownItems={dropdownItems} />}
    </div>
  );
};

export default AvatarDropdown;
