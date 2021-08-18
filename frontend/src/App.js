import React, { createContext, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Partner from "./components/Partner";
import "./App.css";

const initialState = {
  user: null,
  auth: false,
};

export const userContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
}

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ appState: state, appDispatch: dispatch }}>
        <Route exact={true} path="/" component={Landing}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/partner" component={Partner}></Route>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
