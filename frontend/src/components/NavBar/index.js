import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { clearAuthToken } from "../../services/auth";

function NavBar() {
  const location = useLocation();
  const { appState, appDispatch } = useContext(userContext);
  const [open, setOpen] = useState(false)
  let name = appState.user ? appState.user.name : null;
  name = name === null && appState.user ? appState.user.name : name;
  const initials = name ? name.toUpperCase().substring(0, 2) : null;
  let history = useHistory();

  const handleLogout = () => {
    clearAuthToken();
    history.push("/");
    appDispatch({ type: "SET_AUTH", payload: false });
    //window.location.reload();
  };

  return location.pathname === "/" ? (
    <div></div>
  ) : (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-top"]}>
        <div className={styles["title"]}>
          <h1>Learn Together App</h1>
        </div>
        <div className={styles["navbar-right"]}>
          <div className={styles["username"]} onClick = {()=>{setOpen(prev=>!prev)}}>
            {" "}
            Welcome, {name}{" "}

          </div>
          <div className = {styles['menu-container']}>
          <div className={styles["initials"]}  onClick = {()=>{setOpen(prev=>!prev)}}>{initials}</div>
          <div className = {open? `${styles['menu-open']}`: styles['menu-closed']}>
            <button onClick={handleLogout} className={styles["logout-button"]}>
              log out
            </button>
            </div>
            </div>
        </div>
      </div>

      <nav className={styles["menu"]}>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link
            onClick={(e) => {
              appDispatch({
                type: "SET_CURRENT_PROFILE_ID",
                payload: appState.user.id,
              });
            }}
            to="/profile"
          >
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
