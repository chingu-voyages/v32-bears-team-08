const url = process.env.API_BASE_URL || "http://localhost:5000";
const TOKEN_KEY = process.env.TOKEN_KEY  || "AUTH_TOKEN"


export async function postRegister(data){
	const{name, email, password, confirmPassword} = data
	let response = await fetch(`${url}/registration`, {
			method: "POST",
			body: JSON.stringify({
				data: {
					name,
					email,
					password,
					confirmPassword
				},
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const json = await response.json();
		
		if (!response.ok){
			return Promise.reject({message: json.error})
		}

		return json
}

export async function postLogin(data) {
    const {email, password} = data
	let response = await fetch(`${url}/login`, {
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
		return Promise.reject({message: json.error})
	} 
	
	return json
	
}

export async function postRefreshToken(){

	let response = await fetch(`${url}/login/refresh`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getAuthToken()}`,
			"Content-Type": "application/json",
		},
	});

	const json = await response.json();

	if (!response.ok) {
		return Promise.reject({message: json.error})
	} 

	
	return json;

}


export function saveAuthToken(token){
	console.log(TOKEN_KEY, token)
	return window.sessionStorage.setItem(TOKEN_KEY, token)

}

export function getAuthToken() {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

export function clearAuthToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

export function hasAuthToken() {
    return getAuthToken();
  }

export default {
	  postLogin,
	  postRegister,
	  getAuthToken,
	  saveAuthToken,
	  clearAuthToken,
	  hasAuthToken
  }