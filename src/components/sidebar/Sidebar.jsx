// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoutService from "../../service/LogoutService";
import Cookies from "js-cookie";
import { images } from "../../constants";
import sidebarNav from "../../configs/sidebarNav";

import "./sidebar.scss";

const Sidebar = () => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const [userRole, setUserRole] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const decrypt = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        const decodedToken = await parseJwt(token);
        setUserRole(decodedToken ? decodedToken.Role : "");
      }
    };

    decrypt();
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await LogoutService.signout();
      window.location.reload();
      console.log("User logged out successfully!");
      localStorage.clear();

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo" >
        <img src={images.img1} alt=""  style={{ fontSize: '5em' }} />
        <div className="sidebar-close" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) =>
          nav.roles.includes(userRole) ? (
            <Link
              to={nav.link}
              key={`nav-${index}`}
              className={`sidebar__menu__item ${activeIndex === index && "active"}`}
              onClick={closeSidebar}
            >
              <div className="sidebar__menu__item__icon">{nav.icon}</div>
              <div className="sidebar__menu__item__txt">{nav.text}</div>
            </Link>
          ) : null
        )}
        <div className="sidebar__menu__item  Logout" onClick={handleLogout}>
          <div className="sidebar__menu__item__icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;