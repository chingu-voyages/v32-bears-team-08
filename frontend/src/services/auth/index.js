import config from "../../config";
import jwt_decode from "jwt-decode";

export async function postRegister(data) {
  const { name, email, password, confirmPassword } = data;
  let response = await fetch(`${config.API_ENDPOINT}/registration`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    return Promise.reject({ message: json.error });
  }

  return json;
}

export async function postLogin(data) {
  const { email, password } = data;
  let response = await fetch(`${config.API_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify({
      data: { email, password },
    }),
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    return Promise.reject({ message: json.error });
  }

  return json;
}

export async function postRefreshToken() {
  let response = await fetch(`${config.API_ENDPOINT}/login/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    return Promise.reject({ message: json.error });
  }

  return json;
}

export function saveAuthToken(token) {
  return window.sessionStorage.setItem(config.TOKEN_KEY, token);
}

export function getAuthToken() {
  return window.sessionStorage.getItem(config.TOKEN_KEY);
}

export function clearAuthToken() {
  window.sessionStorage.removeItem(config.TOKEN_KEY);
}

export function hasAuthToken() {
  return getAuthToken();
}

export function decodeToken(token) {
  return jwt_decode(token);
}

const authServices = {
  postLogin,
  postRegister,
  getAuthToken,
  saveAuthToken,
  clearAuthToken,
  hasAuthToken,
  decodeToken,
};

export default authServices;
