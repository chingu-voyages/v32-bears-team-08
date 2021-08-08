import React, { useReducer, useContext } from "react";
import { withRouter } from "react-router-dom";
import { userContext } from "../../App";
import "./style.css";
import authServices from "../../services/auth";

const initialState = {
	email: "",
	password: "",
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_EMAIL":
			return {
				...state,
				email: action.payload,
			};
		case "SET_PASSWORD":
			return {
				...state,
				password: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
	}
}

function Login() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { appState, appDispatch } = useContext(userContext);

	async function handleSubmit(e) {
		e.preventDefault();
		const data = { email: state.email, password: state.password };

		try {
			let res = await authServices.postLogin(data);
			authServices.saveAuthToken(res.authToken)
			//appDispatch({ type: "SET_USER", payload: res.data.user });
			appDispatch({ type: "SET_AUTH", payload: true });
		} catch (error) {
			dispatch({
				type: "SET_ERROR",
				payload: error.message,
			});
		}
	}
	return (
		<>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div>Login</div>
				<label htmlFor="email">
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						onChange={(e) => {
							dispatch({ type: "SET_EMAIL", payload: e.target.value });
						}}
					></input>
				</label>
				<br />
				<label htmlFor="password">
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						onChange={(e) => {
							dispatch({ type: "SET_PASSWORD", payload: e.target.value });
						}}
					></input>
				</label>
				<br />
				<div></div>
				<span>{state.error}</span>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default withRouter(Login);
