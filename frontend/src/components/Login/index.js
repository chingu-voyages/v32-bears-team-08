import React, { useReducer, useContext } from "react";
import { Redirect } from "react-router-dom";
import { userContext } from "../../App";
import styles from "./style.module.css";
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
		default:
			return { ...state };
	}
}

/*
	- login component makes sends user credentials to the login endpoint
	- upon good request: saves authToken to sessionStorage and redirects to dashboard
*/

function Login() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { appState, appDispatch } = useContext(userContext);

	async function handleSubmit(e) {
		e.preventDefault();
		//get form data from local state
		const data = { email: state.email, password: state.password };

		/* 
		   - Make request to login endpoint
		   - save authToken to sessionStorage
		   - decode user credentials from authToken
		   - set global AppState using Context Object dispatch function
		   - set any errors in local state
		*/

		try {
			let res = await authServices.postLogin(data);
			authServices.saveAuthToken(res.authToken);
			const decoded = authServices.decodeToken(res.authToken);
			appDispatch({ type: "SET_USER", payload: decoded });
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
				<div className={styles["login"]}>
					{/* <div className={styles['login__title']}>Log in to Learn Together</div> */}
					{state.error && (
						<span className={styles["login__error"]}>{state.error}</span>
					)}
					<form
						className={styles["login__form"]}
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<label htmlFor="email" className={styles["login__form__label"]}>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter Email"
							className={styles["login__form__input"]}
							onChange={(e) => {
								dispatch({ type: "SET_EMAIL", payload: e.target.value });
							}}
						></input>
						<label htmlFor="password" className={styles["login__form__label"]}>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter Password"
							className={styles["login__form__input"]}
							onChange={(e) => {
								dispatch({ type: "SET_PASSWORD", payload: e.target.value });
							}}
						></input>

						<button className={styles["login__form__button"]} type="submit">
							Log in
						</button>
					</form>
				</div>
			) : (
				<Redirect to="/profile"></Redirect>
			)}
		</>
	);
}

export default Login;
