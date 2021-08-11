import React, { useReducer, useContext } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import "./style.css";
import { userContext } from "../../App";
import authServices from "../../services/auth";
const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_NAME":
			return {
				...state,
				name: action.payload,
			};
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
		case "SET_CONFIRM_PASSWORD":
			return {
				...state,
				confirmPassword: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
	}
}

function Register() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { appState, appDispatch } = useContext(userContext);


	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			name: state.name,
			email: state.email,
			password: state.password,
			confirmPassword: state.confirmPassword,
		};

		try {
			let res = await authServices.postRegister(data);
			authServices.saveAuthToken(res.authToken)
			const decoded = authServices.decodeToken(res.authToken)
			appDispatch({ type: "SET_USER", payload: decoded});
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
			{!appState.auth ? (
				<>
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<div>Register</div>
						<label htmlFor="name">
							<input
								type="name"
								id="name"
								name="name"
								placeholder="Name"
								onChange={(e) => {
									dispatch({ type: "SET_NAME", payload: e.target.value });
								}}
							></input>
						</label>
						<br />
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
						<label htmlFor="confirmPassword">
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								placeholder="Confirm Password"
								onChange={(e) => {
									dispatch({
										type: "SET_CONFIRM_PASSWORD",
										payload: e.target.value,
									});
								}}
							></input>
						</label>
						<br />
						<span>{state.error}</span>
						<button type="submit">Submit</button>
					</form>
					<Link
						to={(location) => ({ ...location, pathname: `/` })}
					>{`${"Already Registered? Click here to login"}`}</Link>
				</>
			) : (
				<Redirect to={"/dashboard"}></Redirect>
			)}
		</>
	);
}

export default withRouter(Register);
