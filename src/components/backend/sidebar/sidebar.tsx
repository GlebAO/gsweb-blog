import React from "react";
import { useAppContext } from "../../../reducers/index";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import {
  faUserAlt,
  faListAlt,
  faUsersCog,
  faChartArea,
  faExternalLinkSquareAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandLogoWhite from "../../common/brand-logo-white";

import "./sidebar.scss";

type NavItemType = {
  label: string;
  path: string;
  icon: IconDefinition;
  allowedRoles: string[];
};

const navItems: NavItemType[] = [
  {
    label: "Dashboard",
    path: "/backend",
    icon: faChartArea,
    allowedRoles: ["admin"],
  },
  {
    label: "Личные данные",
    path: "/backend/profile",
    icon: faUserAlt,
    allowedRoles: ["admin", "guest", "redactor"],
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
  {
    label: "На сайт",
    path: "/",
    icon: faExternalLinkSquareAlt,
    allowedRoles: ["admin", "guest", "redactor"],
  },
];

const NavItem: React.FC<{ navItem: NavItemType }> = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `${navItem.path}`;
  const classes = classNames({
    "nav-link": true,
    active: isCurrentRoute,
  });
  return (
    <Link to={navItem.path} className={classes}>
      <span className="nav-link-content flex items-center">
        <span className="nav-link-icon">
          <FontAwesomeIcon icon={navItem.icon} className="feather" />
        </span>
        <span className="nav-link-label">{navItem.label}</span>
      </span>
    </Link>
  );
};

const NavItemContainer: React.FC<{ key: number }> = ({ children }) => (
  <li className="nav-item">{children}</li>
);

const Sidebar = () => {
  const { state, getUserInfo } = useAppContext();
  const { role } = getUserInfo();
  const { backend: {sidebarOpened} } = state;

  const classes = classNames({
    "sidebar bg-light": true,
    opened: sidebarOpened,
  });

  return (
    <nav id="sidebarMenu" className={classes}>
      <div className="position-sticky">
        <Link className="brand-logo d-block bg-dark pb-2 pt-1 px-2 shadow-sm" to="/backend">
          <BrandLogoWhite width="80" height="35" />
        </Link>
        <div className="pt-2">
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
      </div>
    </nav>
  );
};

export default Sidebar;
