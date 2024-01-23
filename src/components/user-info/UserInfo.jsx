import React from "react";
import "./user-info.scss";
import { data } from "../../constants";

const UserInfo = ({ user }) => {
  // Check if 'user' exists before accessing its properties
  if (!user) {
    return null; // Or render a loading state or handle the absence of user data
  }

 

  return (
    <div className="user-info">
      <div className="user-info__img">
        <img src={data.user.img} alt="" />
      </div>
      <div className="user-info__name">
        <span>
          {user.Nom} {user.Prenom}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
