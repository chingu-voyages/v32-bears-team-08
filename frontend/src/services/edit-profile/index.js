import config from "../../config";
import {getAuthToken} from "../../services/auth";


export async function postSkill(name) {

    let response = await fetch(`${config.API_ENDPOINT}/skills/`, {
      method: "POST",
      body: JSON.stringify({
        data: {name: name.toLowerCase()},
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


  export async function deleteUserSkill(userSkill) {

    let response = await fetch(`${config.API_ENDPOINT}/users-skills/${userSkill}`, {
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


  export async function postLanguage(name) {

    let response = await fetch(`${config.API_ENDPOINT}/languages/`, {
      method: "POST",
      body: JSON.stringify({
        data: {name: name.toLowerCase()},
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


  export async function deleteUserLanguage(userLanguage) {

    let response = await fetch(`${config.API_ENDPOINT}/users-languages/${userLanguage}`, {
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
    deleteUserSkill,
    postLanguage,
    deleteUserLanguage,

}

export default editProfile