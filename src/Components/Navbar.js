import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'

import '../styles/navbar.css'
const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  return (
    
    <nav className='navbar'>
      <ul className="menu">
          <li className="logo">
            <Link to="/veterinary-hospital">
              <Button style={{color: 'white'}}>qs app</Button>
            </Link>
          </li>
          {user ? 
          <div>
            {user.data.roleId === 1 ? (

              <li className="item">
              <Link to="/veterinary-hospital/PatientProfile">
                <Button style={{color: 'white'}}>Welcome {user.data.userName}</Button>
              </Link>
              </li>
            ): null}
            <li className='item button'>
              <Link to="/veterinary-hospital/clinics">
                <Button style={{color: 'white'}}>Clinics</Button>
              </Link>
            </li>
            <li className='item button'>
              <Link to="/veterinary-hospital/contact">
                <Button style={{color: 'white'}}>Contact Us</Button>
              </Link>  
            </li>
            <li className="item button">
              <Link to="/veterinary-hospital">
                <Button color='warning' onClick={() => logout()}>Sign out</Button>
              </Link>
            </li>
          </div>
           :
          <div>
            <li className='item button'>
              <Link to="/veterinary-hospital/contact">
                <Button style={{color: 'white'}}>Contact Us</Button>
              </Link> 
            </li>
            <li className="item button">
              <Link to="/veterinary-hospital/login">
                <Button style={{color: 'white'}}>Log In</Button>
              </Link> 
            </li>
            <li className="item button secondary">
              <Link to="/veterinary-hospital/register">
                <Button style={{color: 'white'}}>Sign Up</Button>
              </Link> 
            </li>
          </div> }
          
          <li className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li>
      </ul>
    </nav>


  )
}

export default Navbar