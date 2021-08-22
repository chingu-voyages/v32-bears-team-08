import React, { useContext } from "react";
import { userContext } from "../../App";
import useProfileApi from "../../hooks/useProfileApi";
import style from "./style.module.css";

function EditProfile(props) {
	const { appState, appStateDispatch } = useContext(userContext);
	const { skills, goal, languages } = props;

	return (
		<div className={style["edit-profile"]}>
			<form className={style["form"]}>
				<label htmlFor={"add"}>Add an Interest</label>
				<input
					type={"text"}
					name={"add-interest"}
					id={"add-interest"}
					className={style["form__input-text"]}
				/>
				<input
					type={"button"}
					name={"add-interest"}
					value={"Add"}
					className={style["form__button"]}
				/>
			</form>

			<form className={style["form"]}>
				<label
					htmlFor={"edit-delete-interest"}
					className={style["form__label"]}
				>
					Edit or Delete an Interest{" "}
				</label>
				<input
					type={"text"}
					name={"edit-delete-interest"}
					id={"edit-delete-interest"}
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
