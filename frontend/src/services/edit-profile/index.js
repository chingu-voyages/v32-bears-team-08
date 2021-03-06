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


  export async function deleteUserSkill(skill) {

    let response = await fetch(`${config.API_ENDPOINT}/users-skills/`, {
      method: "DELETE",
      body: JSON.stringify({
        data: {skill},
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


  export async function deleteUserLanguage(language) {

    let response = await fetch(`${config.API_ENDPOINT}/users-languages`, {
      method: "DELETE",
      body: JSON.stringify({
        data: {language},
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


  export async function putGoal (data) {

    let response = await fetch(`${config.API_ENDPOINT}/users/${data.userId}`, {
      method: "PUT",
      body: JSON.stringify({
        data: {id: data.userId, goal: data.goal},

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


const editProfile ={
    postSkill,
    deleteUserSkill,
    postLanguage,
    deleteUserLanguage,
    putGoal

}

export default editProfile