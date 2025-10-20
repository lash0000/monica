import { Route } from 'react-router-dom';
import Authenticated_Layout from '../layouts/Authenticated';
import Dashboard from '../pages/Dashboard';
import CheckAuth from '../../../lib/CheckAuth';

const UserRoutes = () => [
  // Authenticated Routes
  <Route path="/" element={<CheckAuth><Authenticated_Layout /></CheckAuth>}>
    <Route path="/dashboard" element={<CheckAuth><Dashboard /></CheckAuth>} />
  </Route>,
]

export default UserRoutes;
