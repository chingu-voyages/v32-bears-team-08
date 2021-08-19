import config from "../../config";
import authServices from "../../services/auth";

export async function getPartnerDetails(id) {
  let response = await fetch(`${config.API_ENDPOINT}/users/${id}`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${authServices.getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    return Promise.reject({ message: json.error });
  }

  return json;
}

const partnerProfile = {
  getPartnerDetails,
};

export default partnerProfile;
