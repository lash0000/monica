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
import Landingv2 from '../pages/LandingV2';
import EmergencyHotlines from '../pages/EmergencyHotlines';
import FileTicket from '../pages/FileTicket';

const LandingRoutes = () => [
  <Route path="/" element={<Public_Layout />}>
    <Route index element={<Landingv2 />} />
    <Route path="/emergency-hotlines" element={<EmergencyHotlines />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/personal-info" element={<PersonalInfo/>} />
    <Route path="/otp-verification" element={<OTPVerification />} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/ticket" element={<Ticket />} />
    <Route path="/new-page" element={<NewPage/>} />
    <Route path="/file-ticket" element={<FileTicket/>} />
  </Route>,
]

export default LandingRoutes;
