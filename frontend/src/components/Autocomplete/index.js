import { useEffect, useState } from "react";
import useAllSkillsApi from "../../hooks/useAllSkillsApi"
import style from "./style.module.css"

function Autocomplete(props) {
    const [allSkills, loading, error] = useAllSkillsApi()
    const [ filteredSuggestions, setFilteredSuggestions ] = useState([]);
	const { dispatch, userInput } = props;


    useEffect(()=>{

        setFilteredSuggestions(() => {
            if (userInput){
            return allSkills.filter((skill) => {
                return skill.name.toLowerCase().slice(0, userInput.length).indexOf(userInput.toLowerCase()) > -1;
            });
        }   
        return []
        });

    }, [allSkills, setFilteredSuggestions, userInput])

	return (
		<div className ={style['autcomplete']}>
        <ul className = {style['list']}>

	{
				//map suggestions
				filteredSuggestions.map((suggestion) => {
					return (
						<li  className = {style['list__item']} onClick={() => {
							    dispatch({ type: "SET_SKILL", payload: suggestion.name});
							}}>
							{suggestion.name}
						</li>
					);
				})
			}
            </ul>
		</div>
	);
}

export default Autocomplete

