import { useEffect, useMemo, useState } from "react";
import useAutocomplete from "../../hooks/useAutocomplete"
import style from "./style.module.css"


function Autocomplete(props) {
    const { dispatch, userInput, suggestionType } = props;
    const [allSuggestions, loading, error] = useAutocomplete(suggestionType)
    const [ filteredSuggestions, setFilteredSuggestions ] = useState([]);
    const actionType = useMemo(()=>{
        switch(suggestionType){
            case "skills":
                return 'SET_INPUT_SKILL'
            case "languages":
                return 'SET_INPUT_LANGUAGE'
        }
    }, [suggestionType])


    /* filter selections each time user input changes */
    useEffect(()=>{

        setFilteredSuggestions(() => {
            if (userInput){
            return allSuggestions.filter((suggestion) => {
                return suggestion.name.toLowerCase().slice(0, userInput.length).indexOf(userInput.toLowerCase()) > -1;
            });
        }   
        return []
        });

    }, [allSuggestions, setFilteredSuggestions, userInput])

	return (
		<div className ={style['autcomplete']}>
        <ul className = {style['list']}>

	{
				//map suggestions
				filteredSuggestions.map((suggestion) => {
					return (
						<li  className = {style['list__item']} onClick={() => {
							    dispatch({ type: actionType, payload: suggestion.name});
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

