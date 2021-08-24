import React, { useContext, useReducer } from "react";
import { userContext } from "../../App";
import editProfile from "../../services/edit-profile";
import style from "./style.module.css";

const initialState = {
	input_skill: "",
	"selected_skill": "",
	input_goal: "",
	input_language: "",
	"selected_language": "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_SKILL":
			return {
				...state,
				input_skill: action.payload,
			};
		case "SET_SELECTED_SKILL":
			return { ...state, selected_skill: action.payload };

		case "SET_GOAL":
			return {
				...state,
				input_goal: action.payload,
			};
		case "SET_LANGUAGE":
			return {
				...state,
				input_language: action.payload,
			};
		case "SET_SELECTED_LANGUAGE":
			return { ...state, selected_language: action.payload };
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
		default:
			return { ...state };
	}
}

function EditProfile() {
	const { appState, appDispatch } = useContext(userContext);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { skills, goal, languages } = appState.profile;

	function handleSelectChange(e, type) {
		dispatch({ type, payload: e.target.value });
	}

	function handleError(err) {
		dispatch({ type: "SET_ERROR", payload: err });
	}

	function addSkill() {
		editProfile
			.postSkill(state.input_skill)
			.then((res) =>
				appDispatch({
					type: "SET_PROFILE_SKILLS",
					payload: skills.concat(res.data),
				})
			)
			.catch((err) => handleError(err));
	}

	function addLanguage() {
		editProfile
			.postLanguage(state.input_language)
			.then((res) => {
				appDispatch({
					type: "SET_PROFILE_LANGUAGES",
					payload: languages.concat(res.data),
				});
			})
			.catch((err) => handleError(err));
	}

	function deleteLanguage() {
		editProfile
			.deleteUserLanguage(state.selected_language)
			.then(res=>{
				const filteredLanguages = languages.filter(language=>{
					return language.id !== res.data.language
				})
				appDispatch({type: "SET_PROFILE_LANGUAGES", payload: filteredLanguages})

			})
			.catch((err) => handleError(err));
	}

	function deleteSkill() {
		editProfile
			.deleteUserSkill(state.selected_skill).then(res=>{
					const filteredSkills = skills.filter(skill=>{
						return skill.id !== res.data.skill
					})
				appDispatch({type: "SET_PROFILE_SKILLS", payload: filteredSkills})
			})
			.catch((err) => handleError(err));
	}

	function editGoal() {
		editProfile.putGoal({
			userId: appState.user.id,
			goal: state.input_goal,
		}).then(res=>{
			appDispatch({type: "SET_PROFILE_GOAL", payload: res.data.goal})

		}).catch((err) => handleError(err))
	}

	return (
		<div className={style["edit-profile"]}>
			<form className={style["form"]}>
				<label htmlFor={"add"}>Add an Interest</label>
				<input
					type={"text"}
					name={"add-interest"}
					id={"add-interest"}
					className={style["form__input-text"]}
					onChange={(e) => {
						dispatch({ type: "SET_SKILL", payload: e.target.value });
					}}
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
			</form>

			<form className={style["form"]}>
				<label
					htmlFor={"edit-delete-interest"}
					className={style["form__label"]}
				>
					Delete an Interest{" "}
				</label>
				<select
					name={"delete-interest"}
					id={"delete-interest"}
					className={style["form__select"]}
					onChange={(e) => {
						handleSelectChange(e, "SET_SELECTED_SKILL");
					}}
				>
					{
						//map skill options

						skills.map((skill) => {
							return <option value={skill.id}>{skill.name}</option>;
						})
					}
				</select>
				<input
					type={"button"}
					value={"Delete"}
					className={style["form__button"]}
					onClick={() => deleteSkill()}
				/>
			</form>

			<form className={style["form"]}>
				<label htmlFor={"edit-goal"} className={style["form__label"]}>
					Edit Current Goal
				</label>
				<textarea
					name={"edit-goal"}
					id={"edit-goal"}
					className={style["form__input-textarea"]}
					onChange={(e) =>
						dispatch({ type: "SET_GOAL", payload: e.target.value })
					}
				>
					{goal}
				</textarea>
				<input
					type={"button"}
					name={"edit-goal"}
					value={"Edit"}
					className={style["form__button"]}
					onClick={() => editGoal()}
				/>
			</form>

			<form className={style["form"]}>
				<label htmlFor={"add"} className={style["form__label"]}>
					Add a Preferred Language
				</label>
				<input
					type={"text"}
					name={"add-language"}
					id={"add-language"}
					className={style["form__input-text"]}
					onChange={(e) => {
						dispatch({ type: "SET_LANGUAGE", payload: e.target.value });
					}}
				/>
				<input
					type={"button"}
					name={"add-language"}
					value={"Add"}
					className={style["form__button"]}
			
					onClick={() => addLanguage()}
				/>
			</form>

			<form className={style["form"]}>
				<label
					htmlFor={"edit-delete-language"}
					className={style["form__label"]}
				>
					Delete A Preferred Language
				</label>
				<select
					name={"delete-language"}
					id={"delete-language"}
					className={style["form__select"]}
					onChange={(e) => {
						handleSelectChange(e, "SET_SELECTED_LANGUAGE");
					}}
				>
					{
						//map skill options

						languages.map((language) => {
							return (
								<option value={language.id}>
									{language.name}
								</option>
							);
						})
					}
				</select>
				<input
					type={"button"}
					value={"Delete"}
					className={style["form__button"]}
					onClick={() => deleteLanguage()}
				/>
			</form>
		</div>
	);
}

export default EditProfile;
