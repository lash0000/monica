import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Navbar from '../layouts/Navbar';

const LandingRoutes = () => [
    <Route path="/" element={<Navbar />}>
      <Route index element={<Landing />} />
     { /* <Route path="/homes" element={<StaySuite_Homes_Public />} /> */}
      
    </Route>
]

export default LandingRoutes;