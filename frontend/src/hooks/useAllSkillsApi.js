import {useState, useEffect} from 'react'
import appServices from '../services/autocomplete'


function useAllSkillsApi(){
    const [allSkills, setAllSkills] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


	useEffect(() => {


        async function fetchData(){
            setError(false)
            setLoading(true)

        try{
            const allSkills = await appServices.getAllSkills()
            setAllSkills(allSkills.data)
        } 
        catch (error){
            setError(true)
        }

        setLoading(false)

    }

        fetchData()

    }, []);
    
    return [allSkills, loading, error]

}

export default useAllSkillsApi
