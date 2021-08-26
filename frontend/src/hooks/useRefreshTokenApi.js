import {useEffect} from 'react'
import authServices from '../services/auth'

function useRefreshTokenApi(user){


	useEffect(()=>{

		if(user){
		const decoded = authServices.decodeToken(authServices.getAuthToken())
		authServices.refreshTokenBeforeExpiry(decoded)
		}

	}, [user])

}

export default useRefreshTokenApi


