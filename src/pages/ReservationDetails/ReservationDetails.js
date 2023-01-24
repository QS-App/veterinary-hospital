import React from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../api/useFetch'
import 'react-circular-progressbar/dist/styles.css';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'

const RESERVATION_URL = "/Reservations/test"
const ReservationDetails = () => {

    const location = useLocation()
    const state = location.state
    state.dateTime = state.dateTime.replace('/', '-')
    
    const {data} = useFetch(`${RESERVATION_URL}/${state.clinicId}/${state.userId}/${state.dateTime}`)

    console.log(data)
    return (
        <>

        <Card className='profileCard' sx={{ maxWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Your reservation number: {data.patientNumber}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>


        </>
    )
}

export default ReservationDetails