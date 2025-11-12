import React from 'react'
import { Route } from 'react-router-dom';
import App_Layout from '../layouts/Appbar';
import Dashboard from '../pages/Dashboard';
import Ticket from '../pages/Ticket';
import TicketDetail from '../pages/TicketDetail';
import AyudaManagement from '../pages/AyudaManagement';
import LandingManagement from '../pages/LandingManagement';
import UserManagement from '../pages/UserManagement';

const AdminRoutes = () => [
  <Route key="admin" path="/admin" element={<App_Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="tickets" element={<Ticket />} />
    <Route path="tickets/:id" element={<TicketDetail />} />
    <Route path="ayuda" element={<AyudaManagement />} />
    <Route path="landing" element={<LandingManagement />} />
    <Route path="users" element={<UserManagement />} />
  </Route>
]

export default AdminRoutes;
