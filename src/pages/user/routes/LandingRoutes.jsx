import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Public_Layout from '../layouts/Public';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NewPage from '../pages/NewPage';

const LandingRoutes = () => [
  <Route path="/" element={<Public_Layout />}>
    <Route index element={<Landing />} />
  </Route>,
  <Route path="/login" element={<Login />} />,
  <Route path="/register" element={<SignUp />} />,
  <Route path="/new-page" element={<NewPage />} />,
]

export default LandingRoutes;
