import { Route } from 'react-router-dom';
import Authenticated_Layout from '../layouts/Authenticated';
import Dashboard from '../pages/Dashboard';
import CheckAuth from '../../../lib/CheckAuth';
import TrafficAdvisory from '../pages/Traffic';
import E_app_Apply from '../pages/E-app_Apply';

const UserRoutes = () => [
  // Authenticated Routes
  <Route path="/" element={<CheckAuth><Authenticated_Layout /></CheckAuth>}>
    <Route path="/dashboard" element={<CheckAuth><Dashboard /></CheckAuth>} />
    <Route path="/ulat-trapiko" element={<CheckAuth><TrafficAdvisory /></CheckAuth>} />
    <Route path="/e-application" element={<CheckAuth><E_app_Apply /></CheckAuth>} />
  </Route>,
]

export default UserRoutes;
