import React, { createContext, useReducer, useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
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
					token: action.payload
				
			}
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [register, setRegister] = useState(false);



	return (
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
				<>{!register ? <Login /> : <Register />}</>
				<button
					onClick={(e) => {
						setRegister((prev) => !prev);
					}}
				>{`${
					register ? "Click here to login" : "Not registered? Click here"
				}`}</button>
			</div>
		</userContext.Provider>
	);
}

export default App;