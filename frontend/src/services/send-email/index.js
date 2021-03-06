import config from "../../config";
import { getAuthToken } from "../../services/auth";

export async function postEmail(data) {
  const { text, sender, recipient } = data;
  let response = await fetch(`${config.API_ENDPOINT}/messages/`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        text,
        sender,
        recipient,
      },
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

const sendEmail = {
  postEmail,
};

export default sendEmail;
