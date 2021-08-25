import React, { useContext } from "react";
import { userContext } from "../../App";
import "./style.module.css";

function NavBar() {
  const { appState } = useContext(userContext);
  console.log(appState);
  const id = appState.user ? appState.user.id : null;
  return <h1>Navbar {id}</h1>;
}

export default NavBar;
