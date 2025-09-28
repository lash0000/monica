import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Public_Layout from '../layouts/Public';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PersonalInfo from '../pages/PersonalInfo';
import OTPVerification from '../pages/OTPVerification';
import NewPage from '../pages/NewPage';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Ticket from '../pages/Ticket';
const LandingRoutes = () => [
  <Route path="/" element={<Public_Layout />}>
    <Route index element={<Landing />} />
  </Route>,

  <Route path="/login" element={<Public_Layout />}>

    <Route index element={<Login />} />
  </Route>,
  <Route path="/SignUp" element={<Public_Layout />}>
    <Route index element={<SignUp />} />
  </Route>,
  <Route path="/new-page" element={<NewPage />} />,
  <Route path="/forgotpassword" element={<Public_Layout />}>
    <Route index element={<ForgotPassword />} />
  </Route>,
 <Route path="/personal-info" element={<Public_Layout />}>
    <Route index element={<PersonalInfo />} />
  </Route>,
  <Route path="/otp-verification" element={<Public_Layout />}>
    <Route index element={<OTPVerification />} />
  </Route>,
  <Route path="/dashboard" element={<Public_Layout />}>
    <Route index element={<Dashboard />} />
  </Route>,
  <Route path="/ticket" element={<Public_Layout />}>
    <Route index element={<Ticket />} />
  </Route>,
]

export default LandingRoutes;
