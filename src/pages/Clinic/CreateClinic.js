import { Typography, Grid, Paper, Box, TextField, Input, Checkbox, FormGroup, FormControlLabel, Button } from '@material-ui/core'
import Slider from '@mui/material/Slider';
import '../../styles/createClinic.css'
import React, { useState } from 'react'
import ShowNotification from '../../utils/ShowNotification'

import axios from '../../api/axios'
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';



const CLINIC_URL_POST = '/clinics'

const CreateClinic = () => {

    const [clinicName, setClinicName] = useState(null)
    const [fromTo, setFromTo] = useState([0, 50])
    const [limit, setLimit] = useState(0)
    const [clinicType, setClinicType] = useState(null)
    const [clinicImage, setClinicImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [workDays, setWorkDays] = useState([])
    
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
            value = e.target.value;
          } else {
            const checkeds = document.getElementsByTagName('input');
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            Name: clinicName,
            RangeFrom: fromTo[0],
            RangeTo: fromTo[1],
            LogoFile: clinicImage,
            Logo: imageName,
            Limit: limit,
            WorkDays: workDays
        }
        try {
            const response = await axios.post(CLINIC_URL_POST, body, {
                headers: { 'Content-Type': 'application/json' }, responseType: 'text'
            })
            ShowNotification("Success", "Clinic Created successfully!", "success")
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
                        <Typography  variant="h5">Add Clinic</Typography>
                    </Box>
                    <Box p={1} display="flex" alignItems="center" justifyContent="center">
                        <TextField onChange={(e) => setClinicName(e.target.value)} label="Clinic name"  type="text" style={{ width: "400px" }}></TextField>
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
                                <FormControlLabel value="specialist" control={<Radio />} label="Specialist" />
                                <FormControlLabel value="advisor" control={<Radio />} label="Advisor" />
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
                                    <FormControlLabel control={<Checkbox color='primary' id="input" onChange={handleCheckBox} value={JSON.stringify(day)} />} label={day} />

                                </div>
                            ))}

                        </FormGroup> 
                    </Box>
                    <Box p={1} display="flex" alignItems="center" justifyContent="center">
                        <Button type='submit' variant="contained">Create Clinic</Button>
                    </Box>
                </Box>
            </Paper>
            </form>
            
        </Grid>
    </Grid>
  )
}

export default CreateClinic