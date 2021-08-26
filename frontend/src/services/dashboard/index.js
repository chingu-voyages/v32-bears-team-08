import config from "../../config";
import { getAuthToken } from "../auth";

export async function getRecommendedUsers(userId) {
    let response = await fetch(`${config.API_ENDPOINT}/users/recommendations/${userId}`, {
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

export const dashboardServices ={
    getRecommendedUsers
}
