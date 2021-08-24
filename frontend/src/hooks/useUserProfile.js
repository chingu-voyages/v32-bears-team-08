import {useState, useEffect} from 'react'
import profileServices from '../services/profile'

function useUserProfile(userId, dispatch){
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

	useEffect(() => {

    if(!userId){ return }

        async function fetchData(){

            setLoading(true)
        try{
            const user = await profileServices.getUser(userId)
            const skills = await profileServices.getUserSkills(userId)
            const languages = await profileServices.getUserLanguages(userId)
            dispatch({ type: "SET_PROFILE_SKILLS", payload:skills.data });
            dispatch({ type: "SET_PROFILE_GOAL", payload: user.data.goal });
            dispatch({ type: "SET_PROFILE_LANGUAGES", payload: languages.data });


        } 
        catch (error){
            setError(true)
            throw error
        }

        setLoading(false)

    }

        fetchData()

    }, [userId, dispatch]);
    
    return [error, loading]

}

export default useUserProfile
