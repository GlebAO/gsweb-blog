import React from "react";
import { useAppContext } from "../../../reducers/index";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import {
  faUserAlt,
  faListAlt,
  faUsersCog,
  faChartArea,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./sidebar.scss";

type NavItemType = {
  label: string;
  path: string;
  icon: IconDefinition;
  allowedRoles: string[];
};

const navItems: NavItemType[] = [
  {
    label: "Профиль",
    path: "/backend/profile",
    icon: faUserAlt,
    allowedRoles: ["admin", "guest", "redactor"],
  },
  {
    label: "Dashboard",
    path: "/backend",
    icon: faChartArea,
    allowedRoles: ["admin"],
  },
  {
    label: "Пользователи",
    path: "/backend/users",
    icon: faUsersCog,
    allowedRoles: ["admin"],
  },
  {
    label: "Посты",
    path: "/backend/posts",
    icon: faListAlt,
    allowedRoles: ["admin"],
  },
];

const NavItem: React.FC<{ navItem: NavItemType }> = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `/${navItem.path}`;
  const classes = classNames({
    "nav-link": true,
    active: isCurrentRoute,
  });
  return (
    <Link to={navItem.path} className={classes}>
      <span className="flex items-center">
        <span className="mr-1">
          <FontAwesomeIcon icon={navItem.icon} className="feather" />
        </span>
        <span>{navItem.label}</span>
      </span>
    </Link>
  );
};

const NavItemContainer: React.FC<{ key: number }> = ({ children }) => (
  <li className="nav-item">{children}</li>
);

const Sidebar = () => {
  const { getUserInfo } = useAppContext();
  const { role } = getUserInfo();

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {navItems.map((navItem, i) => (
            <NavItemContainer key={i}>
              {navItem.allowedRoles.includes(role) && (
                <NavItem navItem={navItem} />
              )}
            </NavItemContainer>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
