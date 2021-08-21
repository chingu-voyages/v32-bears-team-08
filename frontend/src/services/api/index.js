import config from "../../config";
import { getAuthToken } from "../auth";

export async function getUser(userId) {
    let response = await fetch(`${config.API_ENDPOINT}/users/${userId}`, {
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



export async function getUserSkills(userId) {
    let response = await fetch(`${config.API_ENDPOINT}/users-skills/user/${userId}`, {
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

  export async function getUserLanguages(userId) {
    let response = await fetch(`${config.API_ENDPOINT}/users-languages/user/${userId}`, {
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


  const apiServices = {
      getUser,
      getUserSkills,
      getUserLanguages,
  }

  export default apiServices