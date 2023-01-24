import React, { useState } from 'react'
import { Typography, Grid, Paper, Box, TextField, Input, Checkbox, FormGroup, FormControlLabel, Button } from '@material-ui/core'
import Slider from '@mui/material/Slider';
import { useLocation } from 'react-router-dom';
import { FormControl, Radio, RadioGroup } from '@mui/material';
import axios from '../../api/axios';
import ShowNotification from '../../utils/ShowNotification';


const UpdateClinic = () => {
  
  const location = useLocation()
  const data = location.state
  const UPDATE_CLINIC_URL = `/clinics/${data.id}`
  const [clinicName, setClinicName] = useState(data.name)
  const [fromTo, setFromTo] = useState([data.rangeFrom, data.rangeTo])
  const [limit, setLimit] = useState(data.limit)
  const [clinicImage, setClinicImage] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [workDays, setWorkDays] = useState(null)
  const [clinicType, setClinicType] = useState(data.clinicType)


  const WeekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday"
  ]
  const handleChangeLimit = (e, newValue) => {
    setLimit(newValue)
  }
  const handleFromToChange = (e, newValue) => {
    setFromTo(newValue)
  }
  const valuetext= (value) => {
    return `${value}°C`;
  }


  const handleCheckBox = (e) => {
    const checkedArr = []
    let value
    if (e.target.type !== 'checkbox') {
      console.log('??');
        value = e.target.value;
      } else {
        const checkeds = document.getElementsByTagName('input');
        //console.log(checkeds)
        for (let i = 7; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
            checkedArr.push(JSON.parse(checkeds[i].value))
          }
        }
        value = checkedArr;
      }
    setWorkDays(value)
  }
  const uploadImage = (e) => {
    const file = e.target.files[0]
    setImageName(e.target.files[0].name)
    setClinicImage(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let body = {
        id: data.id,
        Name: clinicName,
        ClinicType: clinicType,
        RangeFrom: fromTo[0],
        RangeTo: fromTo[1],
        LogoFile: clinicImage,
        Logo: imageName,
        Limit: limit,
        WorkDays: workDays
    }
    try {
      const response = await axios.put(UPDATE_CLINIC_URL, body, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      ShowNotification("Success", `${clinicName} clinic updated successfully!`, "success")
    } catch (error) {
      ShowNotification("Error", "There's somthing wrong", "danger")
    }
  }
  return (
    <Grid container justifyContent="center">
    <Grid item>
        <form onSubmit={handleSubmit}>
        <Paper style={{width: '70%', margin: 'auto'}}>
            <Box m={2} p={5} alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography  variant="h5">Update {clinicName}</Typography>
                </Box>
                <Box p={1} display="flex" alignItems="center" justifyContent="center">
                    <TextField value={clinicName} onChange={(e) => setClinicName(e.target.value)} label="Clinic name"  type="text" style={{ width: "400px" }}></TextField>
                </Box>
                <Box p={1}>
                <Typography>Range From {fromTo[0]} To {fromTo[1]}</Typography>
                    <Slider
                        getAriaLabel={() => 'Range From -> To'}
                        value={fromTo}
                        onChange={handleFromToChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />

                </Box>
                <Box p={1}>
                    <Typography>Limit: {limit}</Typography>
                    <Slider defaultValue={50} value={limit} onChange={handleChangeLimit} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box>
                  <FormControl>
                      <Typography>Clinic Type</Typography>
                      <RadioGroup onChange={(e) => setClinicType(e.target.value)} row>
                          <FormControlLabel value="specialist" control={<Radio />} checked={clinicType === "specialist"} label="Specialist" />
                          <FormControlLabel value="advisor" control={<Radio />} checked={clinicType === "advisor"} label="Advisor" />
                      </RadioGroup>
                  </FormControl>
                  </Box>
                <Box p={1}>
                    <Typography>Clinic Image:</Typography>
                    <Input type='file' onChange={uploadImage} ></Input>
                </Box>
                <Box p={1} className='weekDays'>
                    

                    <FormGroup style={{display: 'inline-block'}}>
                        <Typography>Work Days:</Typography>
                        {WeekDays.map((day, idx) => (
                            <div className='col' key={idx}>
                                <FormControlLabel control={<Checkbox
                                defaultChecked={data.workDays.includes(day)}
                                color='primary' id="input" onChange={handleCheckBox} value={JSON.stringify(day)} />} label={day} />

                            </div>
                        ))}

                    </FormGroup> 
                </Box>
                <Box p={1} display="flex" alignItems="center" justifyContent="center">
                    <Button type='submit' variant="contained">Update Clinic</Button>
                </Box>
            </Box>
        </Paper>
        </form>
        
    </Grid>
</Grid>
  )
}

export default UpdateClinic