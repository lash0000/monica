import { Route } from 'react-router-dom';
import Public_Layout from '../layouts/Public';
import Authenticated_Layout from '../layouts/Authenticated';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PersonalInfo from '../pages/PersonalInfo';
import OTPVerification from '../pages/OTPVerification';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Ticket from '../pages/Ticket';
import Landingv2 from '../pages/LandingV2';
import EmergencyHotlines from '../pages/EmergencyHotlines';
import FileTicket from '../pages/FileTicket';
import ProfileUser from '../pages/ProfileUser';
import E_app_Apply from '../pages/E-app_Apply';
import E_app_Bonafied from '../pages/E-app_Bonafied';
import CheckRegisterAuth from '../../../lib/CheckRegisterAuth';
import CheckAuth from '../../../lib/CheckAuth';

const LandingRoutes = () => [
  // Public Routes
  <Route key="public" path="/" element={<Public_Layout />}>
    <Route index element={<Landingv2 />} />
    <Route path="emergency-hotlines" element={<EmergencyHotlines />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="personal-info" element={<PersonalInfo />} />
    <Route path="otp-verification" element={<CheckRegisterAuth><OTPVerification /></CheckRegisterAuth>} />
    <Route path="profileuser" element={<ProfileUser />} />
  </Route>,
]

export default LandingRoutes;
