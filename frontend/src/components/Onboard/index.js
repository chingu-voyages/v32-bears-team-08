import React, { useContext, useReducer } from "react";
import { userContext } from "../../App";
import { Redirect, withRouter } from "react-router-dom";
import Autocomplete from "../Autocomplete";
import editProfile from "../../services/edit-profile";
import style from "./style.module.css";

const initialState = {
	input_skill: "",
	input_goal: "",
	input_language: "",
	onboard_stage: 0,
    transition: false,
	error: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_INPUT_SKILL":
			return {
				...state,
				input_skill: action.payload,
			};
		case "SET_INPUT_GOAL":
			return {
				...state,
				input_goal: action.payload,
			};
		case "SET_INPUT_LANGUAGE":
			return {
				...state,
				input_language: action.payload,
			};
		case "SET_ONBOARD_STAGE":
			return {
				...state,
				onboard_stage: action.payload,
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

function Onboard() {
	const { appState } = useContext(userContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleError(err) {
		dispatch({ type: "SET_ERROR", payload: err });
	}

	function addSkill() {
		editProfile
			.postSkill(state.input_skill)
			.then((res) => {
				dispatch({ type: "SET_INPUT_SKILL", payload: "" });
			})
			.catch((err) => handleError(err));
	}

	function editGoal() {
		editProfile
			.putGoal({
				userId: appState.user.id,
				goal: state.input_goal,
			})
			.then((res) => {
				dispatch({ type: "SET_INPUT_GOAL", payload: "" });
			})
			.catch((err) => handleError(err));
	}

	function addLanguage() {
		editProfile
			.postLanguage(state.input_language)
			.then((res) => {
				dispatch({ type: "SET_INPUT_LANGUAGE", payload: "" });
			})
			.catch((err) => handleError(err));
	}

	return (
		<>
			{state.onboard_stage < 3 ? (
				<div className={style["onboard"]}>
					<div className={style["stage"]}>
						<h1 className={style["title"]}>
							Looks like you're new here, let's get you started.
						</h1>

						{state.onboard_stage === 0 && (
							<>
								<form className={style["form"]}>
									<label htmlFor={"add"} className={style["form__label"]}>
										First, add some skills, interests, or hobbies you would like
										to learn.
									</label>
									<input
										type={"text"}
										name={"add-interest"}
										id={"add-interest"}
										className={style["form__input-text"]}
										value={state.input_skill}
										onChange={(e) => {
											dispatch({
												type: "SET_INPUT_SKILL",
												payload: e.target.value,
											});
										}}
									/>
									<Autocomplete
										dispatch={dispatch}
										userInput={state.input_skill}
										suggestionType={"skills"}
									/>
									<input
										type={"button"}
										name={"add-interest"}
										value={"Add"}
										className={style["form__button"]}
										onClick={() => {
											addSkill();
										}}
									/>
								</form>{" "}
							</>
						)}

						{state.onboard_stage === 1 && (
							<>
								{" "}
								<form className={style["form"]}>
									<label htmlFor={"edit-goal"} className={style["form__label"]}>
										What are some of your learning goals? What do you want to
										accomplish? When?
									</label>
									<textarea
										name={"edit-goal"}
										id={"edit-goal"}
										value={state.input_goal}
										className={style["form__input-textarea"]}
										onChange={(e) =>
											dispatch({
												type: "SET_INPUT_GOAL",
												payload: e.target.value,
											})
										}
									></textarea>
									<input
										type={"button"}
										name={"edit-goal"}
										value={"Submit"}
										className={style["form__button"]}
										onClick={() => editGoal()}
									/>
								</form>
							</>
						)}
						{state.onboard_stage === 2 && (
							<>
								<form className={style["form"]}>
                                    
									<label htmlFor={"add"} className={style["form__label"]}>
										Do you have any language preferences?
									</label>
									<input
										type={"text"}
										name={"add-language"}
										id={"add-language"}
										value={state.input_language}
										className={style["form__input-text"]}
										onChange={(e) => {
											dispatch({
												type: "SET_INPUT_LANGUAGE",
												payload: e.target.value,
											});
										}}
									/>
									<Autocomplete
										dispatch={dispatch}
										userInput={state.input_language}
										suggestionType={"languages"}
									/>

									<input
										type={"button"}
										name={"add-language"}
										value={"Add"}
										className={style["form__button"]}
										onClick={() => addLanguage()}
									/>
								</form>
							</>
						)}
						<input
							type="button"
							className={`${style["form__button"]} ${style["nav__button"]}`}
							value={
								state.onboard_stage === 0 || state.onboard_stage == 1
									? "Next"
									: "Go to Dashboard"
							}
							onClick={() => {
								dispatch({
									type: "SET_ONBOARD_STAGE",
									payload: state.onboard_stage + 1,
								});
							}}
						></input>
					</div>
				</div>
			) : (
				<Redirect to={"/dashboard"}></Redirect>
			)}{" "}
		</>
	);
}

export default withRouter(Onboard);
