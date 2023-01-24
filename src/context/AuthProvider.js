import jwt_decode from 'jwt-decode'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const LoginURL = '/users/login'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        if(localStorage.getItem("tokens")) {
            let tokens = JSON.parse(localStorage.getItem("tokens"))
            let {accessToken: _, ...rest} = tokens
            return {
                token: jwt_decode(tokens.accessToken),
                data: rest
            }
        }
        return null
    })

    const navigate = useNavigate()
    const login = async (payload) => {
        const response = await axios.post(LoginURL, 
            payload, {
                headers: { 'Content-Type': 'application/json' },
                //withCredentials: true
            })
            let {accessToken: _, ...rest} = response.data
        localStorage.setItem("tokens", JSON.stringify(response.data))
        setUser({
            token: jwt_decode(response.data.accessToken),
            data: rest
        })
        navigate("/clinics")
    }


    const logout = async () => {
        // invoke the logout API call, for our NestJS API no logout API
     
        localStorage.removeItem("tokens");
        setUser(null);
        navigate("/");
      };

    return <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext