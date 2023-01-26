import './App.css';
import Register from './pages/Register';
import React from 'react';
import Login from './pages/Login';

import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import PatientProfile from './pages/PatientProfile'
import RequireAuth from './Components/RequireAuth';
import Clinics from './pages/Clinic/Clinics';
import Unauthorized from './Components/Unauthorized'
import Clinic from './pages/Clinic/Clinic';
import Contact from './pages/Contact';
import { ReactNotifications } from 'react-notifications-component'
import CreateClinic from './pages/Clinic/CreateClinic';
import UpdateClinic from './pages/Clinic/UpdateClinic'
import ReservationDetails from './pages/ReservationDetails/ReservationDetails';
import NextReservation from './pages/Next/NextReservation';
const ROLES = {
  'Patient': 1,
  'Nursing': 2,
  'Doctor': 3,
  'Admin': 4
}


function App() {
  return (
    <div className="App">

      <Navbar />
      <ReactNotifications />
      <Routes>
          <Route path='/veterinary-hospital' element={<Layout />}>
            <Route path='/veterinary-hospital' element={<Home />} />
            <Route path='/veterinary-hospital/register' element={<Register />} />
            <Route path='/veterinary-hospital/login' element={<Login />} />
            <Route path="/veterinary-hospital/contact" element={<Contact />} />
            <Route path="/veterinary-hospital/unauthorized" element={<Unauthorized />} />


            {/* Protected Routes require login */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Patient]}/>}>
              <Route path='/veterinary-hospital/PatientProfile' element={<PatientProfile />} />
              <Route path="/veterinary-hospital/reservation-details" element={<ReservationDetails />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route path='/veterinary-hospital/create-clinic' element={<CreateClinic />} />
              <Route path='/veterinary-hospital/update-clinic' element={<UpdateClinic />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Nursing]}/>}>
              <Route path='/veterinary-hospital/clinics/:id/reservations' element={<NextReservation />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Patient, ROLES.Nursing, ROLES.Admin]}/>}>
              <Route path='/veterinary-hospital/clinics' element={<Clinics roles={ROLES} />} />
              <Route path='/veterinary-hospital/clinics/:id' element={<Clinic roles={ROLES} />} />
            </Route>
          </Route>
          

      </Routes>
    </div>
  );
}

export default App;
