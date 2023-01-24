import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthProvider'
import useFetch from '../api/useFetch'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import '../styles/PatientProfile.css'
import { Pagination } from '@material-ui/lab'
import usePagination from '../Components/Pagination'
import { Link } from 'react-router-dom'



const GET_PATIENT_RESERVATIONS = 'Reservations/user'
const PatientProfile = () => {
  let [page, setPage] = useState(1);
  const { user } = useContext(AuthContext)
  const PER_PAGE = 5;
  const {data, loading, error} = useFetch(`${GET_PATIENT_RESERVATIONS}/${user.data.userId}`)
  const count = Math.ceil(data.length / PER_PAGE);

  const [reservationsOpen, setResrvationsOpen] = useState(false)

  const [orderDirection, setOrderDirection] = useState("asc")


  let _DATA = usePagination(data, PER_PAGE)


  // const rows = _DATA.currentData()
  // const [rowsData, setRowsData] = useState(rows)
    // const [_DATA, _SETDATA] = usePagination(data, PER_PAGE)
    // console.log(rowsData)

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    // setRowsData(rows)
  };
  const handleReservationsButton = () => {
    // setRowsData(rows)
    setResrvationsOpen(!reservationsOpen)
  }






  // const handleSortRequest = () => {
  //   setRowsData(sortArray(rows, orderDirection));
  //   setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  // };

  return (
    <>
      <Typography variant='h4' align='center'>{user.data.roleName} Profile</Typography>
      <Card className='profileCard' sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.data.userName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {user.data.phoneNumber}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {user.data.nationalId}
          </Typography>

          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleReservationsButton} size="small" color="primary">
          Reservations
        </Button>
      </CardActions>
    </Card>

    { reservationsOpen && (
    <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} container spacing={1} justifyContent="center">
      <Grid item>
        <Paper>
          <Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Clinic Name</TableCell>
                    <TableCell align="center">
                        DateTime
                    </TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">cost</TableCell>
                    <TableCell align="center">patientNumber</TableCell>
                    <TableCell align="center">confirmedDate</TableCell>
                    <TableCell align="center">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_DATA.currentData().map((reservation, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
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
                      <TableCell align="center">
                        {reservation.confirmedDate}
                      </TableCell>
                      <TableCell align="center">
                        <Link to="/reservation-details"
                        state={{
                          clinicId: reservation.clinicId,
                          userId: user.data.userId,
                          dateTime: reservation.dateTime.replace("/", "-")
                        }}>
                          <Button style={{color: 'black'}}>View Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Grid>
      <Pagination
        style={{margin: '10px'}}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Grid>
    
    )

    }
    </>
    
  )
}

export default PatientProfile