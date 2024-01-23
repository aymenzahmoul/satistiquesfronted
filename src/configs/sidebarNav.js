// sidebarNav.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faCalendarDays, faUsersRectangle, faStoreAltSlash } from "@fortawesome/free-solid-svg-icons";

const sidebarNav = [
  {
    link: "/",
    section: "home",
    icon: <FontAwesomeIcon icon={faHome} />,
    text: "Home",
    roles: ["store","admin"],
  },
  {
    link: "/StateLive",
    section: "StateLive",
    icon: <FontAwesomeIcon icon={faChartLine} />,
    text: "statistique journaux de jour",
    roles: ["store"],
  },
  {
    link: "/StateParDate",
    section: "StateParDate",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    text: "statistique par Un Date",
    roles: ["store"],
  },
  {
    link: "/AdminPage",
    section: "AdminPage",
    icon: <FontAwesomeIcon icon={faUsersRectangle} />,
    text: "Admin Page",
    roles: ["admin"],
  },
  {
    link: "/Store",
    section: "Store",
    icon: <FontAwesomeIcon icon={faStoreAltSlash} />,
    text: "Store",
    roles: ["admin"],
  },
  
];

export default sidebarNav;