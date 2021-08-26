import config from "../../config";
import {getAuthToken} from "../../services/auth"

export async function getAllSkills() {
    let response = await fetch(`${config.API_ENDPOINT}/skills/`, {
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

  export const appServices ={
      getAllSkills
  }

  export default appServices