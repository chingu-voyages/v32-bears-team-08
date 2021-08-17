import styles from "./style.module.css";
import React from "react";

const Userinfo = ({ initials, skilltags }) => {
  return (
    <div className={styles["userinfo"]}>
      <div className={styles["initials"]}>
        <div>{initials}</div>
      </div>
      <div className={styles["skills"]}>
        {skilltags.map((skill) => {
          return <div className={styles["skill"]}> {skill} </div>;
        })}
      </div>
    </div>
  );
};

export default Userinfo;
