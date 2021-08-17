import React from "react";
import { withRouter } from "react-router-dom";
import Userinfo from "../Userinfo";
import styles from "./style.module.css";

function Dashboard(props) {
  return (
    <div className={`container ${styles["dashboard"]}`}>
      <div className={styles["dashboard-left"]}>
        <Userinfo
          initials="AL"
          skilltags={["moonwalking", "knife sharpening"]}
        />
        <Userinfo initials="BL" skilltags={["Skiing", "Piano"]} />
        <Userinfo initials="SR" skilltags={["moonwalking"]} />
        <Userinfo initials="ZW" skilltags={[]} />
      </div>
      <div className={styles["dashboard-right"]}>
        <div>
          <button type="button" className={styles["dashboard-button"]}>
            Current Partners
          </button>
        </div>
        <div>
          <button type="button" className={styles["dashboard-button"]}>
            Find Partners
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
