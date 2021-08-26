import React, { useContext } from "react";
import { userContext } from "../../App";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const { appState } = useContext(userContext);
  const name = appState.profile ? appState.profile.name : null;
  const initials = name ? name.toUpperCase().substring(0, 2) : null;

  return location.pathname === "/" ? (
    <div></div>
  ) : (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-top"]}>
        <div className={styles["title"]}>
          <h1>Learn Together App</h1>
        </div>
        <div className={styles["navbar-right"]}>
          <div className={styles["username"]}> Welcome, {name}</div>
          <div className={styles["initials"]}>{initials}</div>
        </div>
      </div>

      <nav className={styles["menu"]}>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
