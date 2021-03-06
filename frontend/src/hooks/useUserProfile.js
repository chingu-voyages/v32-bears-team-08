import { useState, useEffect } from "react";
import profileServices from "../services/profile";

function useUserProfile(userId, dispatch) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		async function fetchData() {

            setError(false)
			setLoading(true);

			try {
				const user = await profileServices.getUser(userId);
				const skills = await profileServices.getUserSkills(userId);
				const languages = await profileServices.getUserLanguages(userId);
				dispatch({ type: "SET_PROFILE_SKILLS", payload: skills.data });
				dispatch({ type: "SET_PROFILE_GOAL", payload: user.data.goal });
				dispatch({ type: "SET_PROFILE_NAME", payload: user.data.name });
				dispatch({ type: "SET_PROFILE_LANGUAGES", payload: languages.data });
			} catch (error) {
				setError(true);
            }

			setLoading(false);
		}

		fetchData();
	}, [userId, dispatch]);

	return [error, loading];
}

export default useUserProfile;
