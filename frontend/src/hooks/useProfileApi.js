import {useState, useEffect} from 'react'
import profileServices from '../services/profile'

function useProfileApi(userId){
    const [skills, setSkills] = useState([])
    const [goal, setGoal] = useState([])
    const [languages, setLanguages] = useState([])
    const [error, setError] = useState()


	useEffect(() => {


        async function fetchData(){

        try{
            const user = await profileServices.getUser(userId)
            const skills = await profileServices.getUserSkills(userId)
            const languages = await profileServices.getUserLanguages(userId)
            setSkills(skills.data)
            setGoal(user.data.goal)
            setLanguages(languages.data)
        } 
        catch (error){
            setError(error)
            throw error
        }

    }

        fetchData()

    }, [userId]);
    
    return [skills, goal, languages, error]

}

export default useProfileApi
