import { useState, useEffect } from "react";
import autcompleteServices from "../services/autocomplete";

function useAutocomplete(suggestionType) {
	const [allSuggestions, setAllSuggestions] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setError(false);
			setLoading(true);

			try {
                const allSuggestions = await autcompleteServices.getSuggestions(suggestionType)
				setAllSuggestions(allSuggestions.data);
			} catch (error) {
				setError(true);
			}

			setLoading(false);
		}

		fetchData();
	}, [suggestionType]);

	return [allSuggestions, loading, error];
}

export default useAutocomplete;
