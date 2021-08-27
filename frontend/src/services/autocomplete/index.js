import config from "../../config";
import {getAuthToken} from "../../services/auth"

export async function getSuggestions(suggestionType) {
    let response = await fetch(`${config.API_ENDPOINT}/${suggestionType}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,

      },
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      return Promise.reject({ message: json.error });
    }
  
    return json;
  }

  export const autocompleteServices ={
      getSuggestions
  }

  export default autocompleteServices