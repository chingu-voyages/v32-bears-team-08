import React, { createContext, useEffect, useReducer} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import authServices from "./services/auth";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import "./App.css";
import useRefreshTokenApi from "./hooks/useRefreshTokenApi";

const initialState = {
	user: authServices.isTokenValid() ? authServices.decodeToken(authServices.getAuthToken()): null,
	auth: authServices.isTokenValid() ? true: false,
	profile: null,
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
		case "SET_PROFILE_SKILLS":
			return {
				...state,
				profile: {
					...state.profile,
					skills: action.payload
				},
			};
		case "SET_PROFILE_GOAL":
			return {
				...state,
				profile: {
					...state.profile,
					goal: action.payload
				},
			};
		case "SET_PROFILE_LANGUAGES":
			return {
				...state,
				profile: {
					...state.profile,
					languages: action.payload
				},
			};

		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	useRefreshTokenApi(state.user)

	return (
		<BrowserRouter>
			<userContext.Provider value={{ appState: state, appDispatch: dispatch }}>
				<Route exact={true} path="/" component={Landing}></Route>
				<Route path="/dashboard" component={Dashboard}></Route>
				<Route path="/profile" component={Profile}></Route>
			</userContext.Provider>
		</BrowserRouter>
	);
}

export default App;
