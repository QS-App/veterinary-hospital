import { useRef, useState, useEffect } from 'react'
import React from 'react'
import '../styles/signUPandIN.css'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/users/register';


const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()

    const options = [
        { value: 1, label: 'Patient' },
        { value: 2, label: 'Nursing' },
        { value: 3, label: 'Doctor' },
        { value: 4, label: 'Admin' }
    ]
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)


    const [nationalId, setNationalId] = useState('')
    const [validNationalId, setValidNational] = useState(false)
    const [nationalIdFocus, setNationalIdFocus] = useState(false)


    const [phoneNumber, setPhoneNumber] = useState('')
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false)


    const [roleId, setRoleId] = useState(null)
    const [validRolId, setValidRoleId] = useState(false)

    const [errMsg, setErrMsg] = useState('');




    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidNational(nationalId.length === 14)
    }, [nationalId])
    useEffect(() => {
        setValidPhoneNumber(phoneNumber.length === 11)
    }, [phoneNumber])
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setValidRoleId(roleId !== null)
    })

    useEffect(() => {
        setErrMsg('')
    }, [username, password, matchPassword])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(username)
        const v2 = PWD_REGEX.test(password)
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry!")
            return
        }

        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({
                    UserName: username, 
                    Password: password, 
                    NationalId: nationalId, 
                    PhoneNumber: phoneNumber,
                    RoleId: roleId
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            )

            navigate('/veterinary-hospital')
            
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
    <section className='registerPage'>
        <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className='text'>Register</h1>
        <form onSubmit={handleSubmit}>
            <label className='text' htmlFor="username">Username:
            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} /> </label>
            <input type="text" id='username' ref={userRef} autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-invalid={validUsername ? 'false': 'true'}
            aria-describedby="uidnote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)} />

            <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>


            <label className='text' htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />
            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                {/* Must include uppercase and lowercase letters, a number and a special character.<br /> */}
                {/* Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> */}
            </p>


            <label className='text' htmlFor="confirm_password">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
            </label>
            <input
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>

            <label className='text' htmlFor="nationalId">
                National Id:
                <FontAwesomeIcon icon={faCheck} className={validNationalId ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validNationalId || !nationalId ? "hide" : "invalid"} />
            </label>
            <input
                type="text"
                id="nationalId"
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}
                required
                aria-invalid={nationalId ? "false" : "true"}
                aria-describedby="nationalIdNote"
                onFocus={() => setNationalIdFocus(true)}
                onBlur={() => setNationalIdFocus(false)}
                />
            <p id="nationalIdNote" className={nationalIdFocus && !validNationalId ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be 14 numbers.
            </p>


            <label className='text' htmlFor="phoneNumber">
                PhoneNumber:
                <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
            </label>
            <input
                type="text"
                id="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                aria-invalid={phoneNumber ? "false" : "true"}
                aria-describedby="phoneNumberNote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
                />
            <p id="phoneNumberNote" className={phoneNumberFocus && !validPhoneNumber ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be 11 numbers.
            </p>

            <label htmlFor="Roles" className='text'>Choose role: </label>
            <Select className='select' options={options}
            // @ts-ignore
            onChange={(choice) => setRoleId(choice.value)} />

            <button className='signupButton' disabled={!validUsername || !validPassword || !validMatch || !validNationalId
                || !validPhoneNumber || !validRolId ? true : false }>Sign Up</button>

        </form>
        <p className='text'>
            Already registered?<br />
            <span className="line">
                {/*put router link here*/}
                <a href="/login">Sign In</a>
            </span>
        </p>
    </section>
  )
}

export default Register