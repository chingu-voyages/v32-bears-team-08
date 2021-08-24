import React, { useReducer, useContext } from "react";
import { Redirect } from "react-router-dom";
import styles from "./style.module.css";
import { userContext } from "../../App";
import authServices from "../../services/auth";

const initialState = {
	name: null,
	email: null,
	password: null,
	error: null,
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
	- Register component makes sends user credentials to the registration endpoint
	- upon good request: saves authToken to sessionStorage and redirects to dashboard
*/

function Register() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { appState, appDispatch } = useContext(userContext);

	async function handleSubmit(e) {
		e.preventDefault();
		//get form data from local state
		const data = {
			name: state.name,
			email: state.email,
			password: state.password,
		};

		/* 
		   - Make request to registration endpoint
		   - save authToken to sessionStorage
		   - decode user credentials from authToken
		   - set global AppState using Context Object dispatch function
		   - set any errors in local state
		*/

		try {
			let res = await authServices.postRegister(data);
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
				<div className={styles["register"]}>
					{state.error && (
						<span className={styles["register__error"]}>{state.error}</span>
					)}
					<form
						className={styles["register__form"]}
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<label htmlFor="name" className={styles["register__form__label"]}>
							Username
						</label>

						<input
							type="Username"
							id="Username"
							name="Username"
							placeholder="Enter Username"
							className={styles["register__form__input"]}
							onChange={(e) => {
								dispatch({ type: "SET_NAME", payload: e.target.value });
							}}
						></input>
						<label htmlFor="email" className={styles["register__form__label"]}>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							className={styles["register__form__input"]}
							onChange={(e) => {
								dispatch({ type: "SET_EMAIL", payload: e.target.value });
							}}
						></input>

						<label
							htmlFor="password"
							className={styles["register__form__label"]}
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter Password"
							className={styles["register__form__input"]}
							onChange={(e) => {
								dispatch({ type: "SET_PASSWORD", payload: e.target.value });
							}}
						></input>

						<button type="submit" className={styles["register__form__button"]}>
							Register
						</button>
					</form>
				</div>
			) : (
				<Redirect to={"/profile"}></Redirect>
			)}
		</>
	);
}

export default Register;
