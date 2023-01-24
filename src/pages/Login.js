import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/signUPandIN.css'
import AuthContext from '../context/AuthProvider';

const LoginURL = '/users/login'
const Login = () => {

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathName || "/"
    const userRef = useRef()
    const errRef = useRef()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    
    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, [])

    
    useEffect(() => {
        setErrMsg('')
    }, [phoneNumber, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let payload = {
                PhoneNumber: phoneNumber,
                Password: password
            }
            // const response = await axios.post(LoginURL, 
            //     JSON.stringify({
            //         NationalId: nationalId,
            //         Password: password
            //     }), {
            //         headers: { 'Content-Type': 'application/json' },
            //         //withCredentials: true
            //     })
            //     const accessToken = response?.data?.accessToken
            //     const roleId = response?.data?.roleId
            //     const username = response?.data?.userName
            //     console.log(response?.data)
            //     setAuth({user: nationalId, accessToken, roleId})
            await login(payload)
                setPhoneNumber('')
                setPassword('')
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg(error.response.data);
            } else {
                setErrMsg('Registration Failed')
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }

  return (
    <section className='loginPage'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className='login'>
            <h1 className='text'>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label className='text' htmlFor="NationalId"> Phone Number: </label>
                <input type="text"
                    id='Phonenumber'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    required 
                />

                <label className='text' htmlFor="Password"> Password: </label>
                <input type="password"
                    id='password'
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required 
                />

                <button className='signinButton'>Sign In</button>
            </form>
            <p className='text'>
                Need an Account?<br />
                <span className="line">
                    <a href="/register">Sign Up</a>
                </span>
            </p>
            </div>
            
        </section>
    
  )
}

export default Login