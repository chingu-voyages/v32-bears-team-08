import React, { createContext, useReducer} from "react";
import { BrowserRouter, Route, Link, useLocation } from "react-router-dom";
import Landing from "./components/Landing"
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import logo from "./logo.svg";
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
				user: action.payload
			};
		case "SET_AUTH":
			return{
				...state,
					auth: action.payload
				
			}
		default:
			return state;
	}
}

function App(props) {
	const [state, dispatch] = useReducer(reducer, initialState);


	return (
		<BrowserRouter>
		<userContext.Provider value={{ appState: state, appDispatch: dispatch }}>
				<Route exact = {true} path = "/" component = {Landing}></Route>
				<Route path = "/dashboard" component = {Dashboard}></Route>
		</userContext.Provider>
		</BrowserRouter>
	);
}

export default App;