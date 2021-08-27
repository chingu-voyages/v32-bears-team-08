import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Userinfo from "../Userinfo";
import styles from "./style.module.css";
import { getRecommendedUsers } from "../../services/dashboard";
import { userContext } from "../../App";

function Dashboard(props) {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const { appState } = useContext(userContext);
  const id = appState.user ? appState.user.id : null;

  useEffect(() => {
    (async () => {
      const users = await getRecommendedUsers(id);
      setRecommendedUsers(
        users.data.map((user) => ({
          initials: user.name.toUpperCase().substring(0, 2),
          skilltags: user.skills.map((skill) => skill.name),
          key: user.name,
        }))
      );
    })();
  }, [id]);

  return (
    <div className={`container ${styles["dashboard"]}`}>
      <div className={styles["dashboard-left"]}>
        {recommendedUsers.map((user) => (
          <Userinfo {...user} />
        ))}
      </div>
      <div className={styles["dashboard-right"]}></div>
    </div>
  );
}

export default withRouter(Dashboard);
