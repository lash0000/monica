import React from 'react'
import { Route } from 'react-router-dom';
import App_Layout from '../layouts/Appbar';
import Dashboard from '../pages/Dashboard';

const AdminRoutes = () => [
  <Route path="/admin" element={<App_Layout />}>
    <Route index element={<Dashboard />} />
  </Route>
]

export default AdminRoutes;
