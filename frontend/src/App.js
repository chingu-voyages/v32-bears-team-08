import React, { createContext, useReducer, useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);


	return (
		<BrowserRouter>
		<userContext.Provider value={{ appState: state, appDispatch: dispatch }}>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
				<Route path = "/login" component = {Login}></Route>
				<Route path = "/register" component = {Register}></Route>
				<Link
					to = {location=>({...location, pathname: '/register'})}
				>{`${
				 "Not registered? Click here"
				}`}</Link>
			</div>
			<Route path = "/dashboard" component = {Dashboard}></Route>
		</userContext.Provider>
		</BrowserRouter>
	);
}

export default App;