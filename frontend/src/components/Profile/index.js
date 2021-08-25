import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import useUserProfile from "../../hooks/useUserProfile";
import { withRouter } from "react-router";
import EditProfile from "../EditProfile";
import style from "./style.module.css";

function Profile() {
	//set state
	const { appState, appDispatch } = useContext(userContext);
	const [error, loading] = useUserProfile(appState.user.id, appDispatch);
    const [edit, setEdit] = useState(false)


	return (


        <div className ={style['wrapper']}>
		{(!loading && !error && appState.profile) && <div className={style["profile"]}>
            <div className = {style['username']}>{appState.user.name}</div>
			<div className={style["skills"]}>
                <div className = {style['label']}>Skills of Interest:</div>
				{
					/* map skills */
					appState.profile.skills.map((skill) => {
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

				<div className={style["goal__text"]}>{appState.profile.goal}</div>
			</div>

			<div className={style["languages"]}>
            <div className = {style['label']}>Preferred Language:</div>

				{
					/* map languages */
					appState.profile.languages.map((language) => {
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
		</div>}

            {edit && <EditProfile/>}
        </div>
		);
			
}

export default withRouter(Profile);