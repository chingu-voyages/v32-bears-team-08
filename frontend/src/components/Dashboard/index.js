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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendedUsers(id)
      .then((users) => {
        setRecommendedUsers(
          users.data.map((user) => ({
            initials: user.name.toUpperCase().substring(0, 2),
            skilltags: user.skills.map((skill) => skill.name),
            key: user.name,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setRecommendedUsers([]);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={`container ${styles["dashboard"]}`}>
        <div className = {styles["title-container"]}>
        <h2 className = {styles["title"]}>Recommended learning partners</h2>
      </div>
      {recommendedUsers.length === 0 && (
        <h2 className={styles["message"]}>
          {loading
            ? "Loading..."
            : "Oops, no one seems to have the same interests. Try to add more in your profile."}
        </h2>
      )}
      <div>     
        {recommendedUsers.map((user) => (
        <Userinfo {...user} />
      ))}
      </div>
 
    </div>
  );
}

export default withRouter(Dashboard);
