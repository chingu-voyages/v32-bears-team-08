import config from "../../config";
import {getAuthToken} from "../../services/auth";


export async function postSkill(name) {

    let response = await fetch(`${config.API_ENDPOINT}/skills/`, {
      method: "POST",
      body: JSON.stringify({
        data: {name},
      }),
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


  export async function deleteUserSkill(id) {

    let response = await fetch(`${config.API_ENDPOINT}/users-skills/${id}`, {
      method: "DELETE",
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



const editProfile ={
    postSkill,
    deleteUserSkill
}

export default editProfile