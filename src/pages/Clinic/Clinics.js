import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../api/useFetch'
import CircularProgress from '@mui/material/CircularProgress'
import '../../styles/clinics.css'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { Button } from '@mui/material'

const CLINICS_URL = "/clinics"
const Clinics = ({roles}) => {
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const {data, loading, error} = useFetch(CLINICS_URL)
  return (
    <>
      {!loading ? 
      <div className='homeContainer'>
        {user.data.roleId === roles.Admin ? (
        <Link to="/create-clinic">
          <Button variant="contained">
            Create Clinic
          </Button>
        </Link>
        ): null}
        
        <div className="cList">
          {data?.map((value, key) => (
                <div key={key} className="cListItem">
                  
                  {value.logo.length !== 0 ? 
                    <Link to={`${location.pathname}/${value.id}`}>
                      <img className='cListImg' src={`data:image/png;base64,${value.logo}`} />  
                    </Link>:
                    <Link to={`${location.pathname}/${value.id}`}>
                      <img className='cListImg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" /> 
                    </Link>
                  }
                  <div className='cListTitles'>
                  <Link to={`${location.pathname}/${value.id}`}>
                    <p className='clinicName'>{value.name}</p>
                  </Link>
                  </div>
                </div>
          
          ))}
        </div>
        </div>

      : 
        <div className='circularProgress'>
          <CircularProgress style={{color: 'white', width: '50px', height: '50px'}} />
        </div>
      
      }
    </>


        
      
  )
}

export default Clinics