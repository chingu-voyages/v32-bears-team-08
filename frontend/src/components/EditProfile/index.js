import React, { useContext, useReducer } from "react";
import { userContext } from "../../App";
import useProfileApi from "../../hooks/useProfileApi";
import editProfile from "../../services/edit-profile";
import style from "./style.module.css";

const initialState = {
	input_skill: "",
    "user-skill": "",
	input_goal: "",
	input_language: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_SKILL":
			return {
				...state,
				input_skill: action.payload,
			};
		case "SET_USER_SKILL":
			return { ...state, "user-skill": action.payload };

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
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
		default:
			return { ...state };
	}
}

function EditProfile(props) {
	const { appState, appStateDispatch } = useContext(userContext);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { skills, goal, languages } = props;

	function addSkill(event) {
		const skill = state.input_skill;
		editProfile.postSkill(skill);
	}

	function deleteSkill(event) {
		editProfile.deleteUserSkill(state['user-skill']);
	}

    function handleSelectChange(e, type){
        dispatch({type, payload: e.target.value})
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
                    onClick={(e) => {
						addSkill(e);
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
                    onChange={(e) => {handleSelectChange(e, "SET_USER_SKILL")}}
				>
					{
						//map skill options

						skills.map((skill) => {
							return (
								<option value={skill["users-skills"]}>
									{skill.name}
								</option>
							);
						})
					}
				</select>
				<input
					type={"button"}
					value={"Delete"}
					className={style["form__button"]}
					onClick={(e) => deleteSkill()}
				/>
			</form>

			<form className={style["form"]}>
				<label htmlFor={"add"} className={style["form__label"]}>
					Edit Current Goal
				</label>
				<input
					type={"textarea"}
					name={"edit-goal"}
					id={"add-interest"}
					className={style["form__input-textarea"]}
				/>
				<input
					type={"button"}
					name={"edit-goal"}
					value={"Edit"}
					className={style["form__button"]}
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
				/>
				<input
					type={"button"}
					name={"add-language"}
					value={"Add"}
					className={style["form__button"]}
				/>
			</form>

			<form className={style["form"]}>
				<label
					htmlFor={"edit-delete-language"}
					className={style["form__label"]}
				>
					Edit or Delete an Interest{" "}
				</label>
				<input
					type={"text"}
					name={"edit-delete-language"}
					id={"edit-delete-language"}
					className={style["form__input-text"]}
				/>
				<input
					type={"button"}
					value={"Edit"}
					className={style["form__button"]}
				/>
				<input
					type={"button"}
					value={"Delete"}
					className={style["form__button"]}
				/>
			</form>
		</div>
	);
}

export default EditProfile;
