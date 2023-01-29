import React, { useState } from 'react'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import useFetch from '../../api/useFetch'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ShowNotification from '../../utils/ShowNotification';
import axios from '../../api/axios';

const NextReservation = () => {

    const location = useLocation()
    const clinicId = location.pathname.split('/')[3]
    const {data, loading, error} = useFetch(`Clinics/Get-today-tomorrow-Reservations/${clinicId}`)
    const laterReservationsResponse = useFetch(`Clinics/GetLaterReservations/${clinicId}`)
    const [todayReservationsOpen, setTodayReservationsOpen] = useState(false)
    const [laterReservationsOpen, setLaterReservationsOpen] = useState(false)
    const CHANGE_RESERVATION_STATUS_URL = '/Reservations/change-reservation-status'
    const NEXT_RESERVATION_URL = '/Reservations/next-reservation'
    const changeStatusReservation = async (reservationId, status) => {
        try {
            const response = await axios.put(`${CHANGE_RESERVATION_STATUS_URL}/${reservationId}/${status}`)
            if(status === 1) {
                ShowNotification("Success", 'reservation confirmed', "success")
            } else if(status === 0) {
                ShowNotification("success", "reservation canceled", "danger")
            }
        } catch (error) {
            ShowNotification("Error", "There's somthing wrong", "danger")
        }
    }
    console.log(data)
    console.log(laterReservationsResponse.data)


    const nextReservation = async () => {
        try {
            const response = await axios.put(`${NEXT_RESERVATION_URL}/${clinicId}`)
            console.log(response)
            if(response.data === 0) {
                ShowNotification("Error", "All Confirmed Patients are reserved today.", "danger")
            }
            else {
                ShowNotification("success", `${typeof(response.data) === 'number' ? `The current patient number is: ${response.data}`: response.data}`, "success")
            }

        } catch (error) {
            ShowNotification("Error", "There's somthing wrong", "danger")
        }
    }
  return (
    <>
    <div style={{display: 'flex', justifyContent: 'space-around', margin: '50px'}}>
        <Button style={{color: 'white'}} onClick={(e) => {
            setTodayReservationsOpen(!todayReservationsOpen)
            setLaterReservationsOpen(false)
        }} size="small">
          Today Reservations
        </Button>
        <Button style={{color: 'white'}} onClick={(e) => {
            setLaterReservationsOpen(!laterReservationsOpen)
            setTodayReservationsOpen(false)
        }} size="small">
          Later Reservations
        </Button>
    </div>
        


    {todayReservationsOpen && (
        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} container spacing={1} justifyContent="center">
      <Grid item>
        {data.today.length === 0 ? <Typography style={{color: 'white'}}>No Patients Today</Typography>: 
        
        <Paper>
          <Grid>
            <Typography textAlign='center' p='5'>Today Reservations</Typography>
            <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button onClick={() => nextReservation()} style={{color: 'white', backgroundColor: '#6903af', margin: '30px'}}>
                Next Patient
            </Button>
        </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                  <TableCell align="center">Patient Name</TableCell>
                    <TableCell align="center">Clinic Name</TableCell>
                    <TableCell align="center">
                        DateTime
                    </TableCell>
                    <TableCell align="center">Time of reservation</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">cost</TableCell>
                    <TableCell align="center">patientNumber</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.today.map((reservation, idx) => (
                    <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                        {reservation.patientName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {reservation.clinicName}
                      </TableCell>
                      <TableCell align="center">
                        {reservation.dateTime}
                      </TableCell>
                      <TableCell align="center">
                        {reservation.reserveTime}:00
                      </TableCell>
                      <TableCell align="center">
                        {reservation.status}
                      </TableCell>
                      <TableCell align="center">
                        {reservation.cost}
                      </TableCell>
                      <TableCell align="center">
                        {reservation.patientNumber}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
        }

        
      </Grid>
    </Grid>
    )}

{laterReservationsOpen && (
        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} container spacing={1} justifyContent="center">
      <Grid item>
      {laterReservationsResponse.data.length === 0 ? <Typography>No Patients Tomorrow</Typography> : 
        <Paper>
        <Grid>
        <Typography textAlign='center' p='5'>Later Reservations</Typography>

          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center">Patient Name</TableCell>
                  <TableCell align="center">Clinic Name</TableCell>
                  <TableCell align="center">
                      DateTime
                  </TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">cost</TableCell>
                  <TableCell align="center">patientNumber</TableCell>
                  <TableCell align="center">Confirmation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laterReservationsResponse.data.map((reservation, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {reservation.patientName}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.clinicName}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.dateTime}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.status}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.cost}
                    </TableCell>
                    <TableCell align="center">
                        {reservation.patientNumber}
                    </TableCell>
                    {reservation.statusId === 2 && (
                      <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                    )}
                    {reservation.statusId === 6 && <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>}
                    {(reservation.statusId !== 2 && reservation.statusId !== 6) && (

                    <TableCell align="center">
                      <Button onClick={() => changeStatusReservation(reservation.id,1)}>
                          <CheckIcon />
                      </Button>
                      <Button onClick={() => changeStatusReservation(reservation.id,0)}>
                          <CloseIcon />
                      </Button>
                    </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
        }
        
      </Grid>
    </Grid>
    )}
    </>
  )
}

export default NextReservation