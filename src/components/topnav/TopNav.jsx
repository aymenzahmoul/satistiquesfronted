import React, { useState, useEffect } from "react";
import "./topnav.scss";
import UserInfo from "../user-info/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Replace with the icon you want to use
import AuthService from "../../service/AuthService";

const TopNav = () => {
  const [UserSt, setUserSt] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AuthService.getUserById();
        setUserSt(userData.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topnav">
      <UserInfo user={UserSt} />
      <div className="sidebar-toggle" onClick={openSidebar}>
        <FontAwesomeIcon icon={faBars} />{" "}
        
      </div>
      <hr></hr>
    </div>
  );
};

export default TopNav;
