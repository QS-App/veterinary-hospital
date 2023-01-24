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
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unauthorized" element={<Unauthorized />} />


            {/* Protected Routes require login */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Patient]}/>}>
              <Route path='/PatientProfile' element={<PatientProfile />} />
              <Route path="/reservation-details" element={<ReservationDetails />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route path='/create-clinic' element={<CreateClinic />} />
              <Route path='/update-clinic' element={<UpdateClinic />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Nursing]}/>}>
              <Route path='/clinics/:id/reservations' element={<NextReservation />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Patient, ROLES.Nursing, ROLES.Admin]}/>}>
              <Route path='/clinics' element={<Clinics roles={ROLES} />} />
              <Route path='/clinics/:id' element={<Clinic roles={ROLES} />} />
            </Route>
          </Route>
          

      </Routes>
    </div>
  );
}

export default App;
