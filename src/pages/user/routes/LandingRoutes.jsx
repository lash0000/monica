import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Public_Layout from '../layouts/Public';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PersonalInfo from '../pages/PersonalInfo';
import OTPVerification from '../pages/OTPVerification';
import NewPage from '../pages/NewPage';


const LandingRoutes = () => [
  <Route path="/" element={<Public_Layout />}>
    <Route index element={<Landing />} />
  </Route>,

  <Route path="/login" element={<Public_Layout />}>
    <Route index element={<Login />} />
  </Route>,
  <Route path="/register" element={<Public_Layout />}>
    <Route index element={<SignUp />} />
  </Route>,
  <Route path="/personal-info" element={<Public_Layout />}>
    <Route index element={<PersonalInfo />} />
  </Route>,
  <Route path="/otp-verification" element={<Public_Layout />}>
    <Route index element={<OTPVerification />} />
  </Route>,
  <Route path="/new-page" element={<NewPage />} />,


]

export default LandingRoutes;
