import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import useProfileApi from "../../hooks/useProfileApi";
import { withRouter } from "react-router";
import EditProfile from "../EditProfile";
import style from "./style.module.css";

function Profile() {
	//set state
	const { appState } = useContext(userContext);
	const [skills, goal, languages, error] = useProfileApi(appState.user.id);
    const [edit, setEdit] = useState(false)

	return (
        <div className ={style['wrapper']}>
		<div className={style["profile"]}>
            <div className = {style['username']}>{appState.user.name}</div>
			<div className={style["skills"]}>
                <div className = {style['label']}>Skills of Interest:</div>
				{
					/* map skills */
					skills.map((skill) => {
						return (
							<div className={style["skills__name"]} key={skill.name}>
								{skill.name}
							</div>
						);
					})
				}
			</div>
			<div className={style["goal"]}>
            <div className = {style['label']}>Current Goal:</div>

				<div className={style["goal__text"]}>{goal}</div>
			</div>

			<div className={style["languages"]}>
            <div className = {style['label']}>Preferred Language:</div>

				{
					/* map languages */
					languages.map((language) => {
						return (
							<div className={style["languages__name"]} key={language.name}>
								{language.name}
							</div>
						);
					})
				}
			</div>

			<div className={style["edit-profile"]}>
				{/* handle Click */}
				<button className={style["edit-profile__buttom"]} onClick ={()=>setEdit(prev=>!prev)}>Edit Profile</button>
			</div>
		</div>

            {edit && <EditProfile skills= {skills} languages = {languages} goal = {goal}/>}
        </div>
	);
}

export default withRouter(Profile);
