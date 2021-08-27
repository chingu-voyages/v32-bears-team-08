import styles from "./style.module.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../../App";
import { useContext } from "react";

const Userinfo = ({ initials, skilltags, id }) => {
  const history = useHistory();
  const { appDispatch } = useContext(userContext);

  function redirect() {
    appDispatch({ type: "SET_CURRENT_PROFILE_ID", payload: id });
    history.push(`/profile/`);
  }

  return (
    <div className={styles["userinfo"]}>
      <div className={styles["initials"]}>
        <div onClick={() => redirect()}>{initials}</div>
      </div>
      <div className={styles["skills"]}>
        {skilltags.map((skill) => {
          return (
            <div key={skill} className={styles["skill"]}>
              {" "}
              {skill}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Userinfo;
