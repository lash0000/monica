import React from 'react'
import { Route } from 'react-router-dom';
import Public_Layout from '../layouts/Public';
import Authenticated_Layout from '../layouts/Authenticated';
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
import ProfileUser from '../pages/ProfileUser';

const LandingRoutes = () => [
  // Public Routes
  <Route path="/" element={<Public_Layout />}>
    <Route index element={<Landingv2 />} />
    <Route path="/emergency-hotlines" element={<EmergencyHotlines />} />
    
    // User Credentials
  <Route path="/login" element={<Login />} />,
  <Route path="/signup" element={<SignUp />} />,
  <Route path="/forgotpassword" element={<ForgotPassword />} />,
  <Route path="/personal-info" element={<PersonalInfo />} />,
  <Route path="/otp-verification" element={<OTPVerification />} />,
  <Route path="/profileuser" element={<ProfileUser />} />,


  </Route>,



  // Reuse soon for admin side (This is wrong for user side)
  <Route path="/" element={<Authenticated_Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/ticket" element={<Ticket />} />
    <Route path="/file-ticket" element={<FileTicket />} />
    <Route path="/e-application" element={<NewPage />} />
    
  </Route>,
]

export default LandingRoutes;
