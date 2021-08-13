import { range } from "lodash";
import { React, useReducer } from "react";
import { withRouter } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import styles from "./style.module.css";
import landingImages from "../../assets/landing";

const initialState = {
	login: false,
	register: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_LOGIN":
			return { ...state, register: false, login: action.payload };
		case "SET_REGISTER":
			return { ...state, login: false, register: action.payload };
		default:
			return { ...state };
	}
}

function Landing() {
	const [state, dispatch] = useReducer(reducer, initialState);

	function setRegister() {
		dispatch({ type: "SET_REGISTER", payload: true });
	}

	function setLogin() {
		dispatch({ type: "SET_LOGIN", payload: true });
	}

	return (
		<div className={styles["landing"]}>
			<div className={styles["gallery"]}>
				{range(1, 10).map((ele) => {
					return (
						<img
							className={styles["gallery__image"]}
							src={landingImages[`image_${ele}`]}
							alt={"cute cartoon animals practicing various skills"}
						></img>
					);
				})}
			</div>
			<div className={styles["app-info"]}>
				<div className={styles["title"]}>Learn Together</div>
				{!state.register && !state.login && (
					<div className={styles["details"]}>
						<div className={styles["details__copy"]}>
							<p className={styles["details__copy__text"]}>
								{" "}
								We help you connect with people interested in learning the
								things you want to learn.
							</p>
							<p className={styles["details__copy__text"]}>
								We believe that learning a new skill, practicing a hobby, or
								delving into deep learning on a topic is better together.
							</p>
							<p className={styles["details__copy__text"]}>
								How does it work? We’ll ask you what you’re interested in and
								when you’re available. Then we will suggest potential partners
								who are available when you are and want to study the same things
								as you!
							</p>
						</div>
						<button
							className={styles["details__button"]}
							onClick={(e) => {
								setRegister();
							}}
						>
							Get Started
						</button>
						<button
							className={styles["details__button"]}
							onClick={() => {
								setLogin();
							}}
						>
							Log In
						</button>
					</div>
				)}
				{state.register && (
					<>
						<Register></Register>
						<span className={styles["toggle"]}>
							Already have an account? Click&nbsp;
							<button
								className={styles["toggle__link"]}
								onClick={(e) => {
									setLogin();
								}}
							>
								here
							</button>{" "}
							to log in.
						</span>
					</>
				)}
				{state.login && (
					<>
						<Login></Login>
						<span className={styles["toggle"]}>
							New around here? Click&nbsp;
							<button
								className={styles["toggle__link"]}
								onClick={(e) => {
									setRegister();
								}}
							>
								here
							</button>{" "}
							to get started.
						</span>
					</>
				)}
			</div>
		</div>
	);
}

export default withRouter(Landing);
