import { Route } from 'react-router-dom';
import Authenticated_Layout from '../layouts/Authenticated';
import Dashboard from '../pages/Dashboard';
import CheckAuth from '../../../lib/CheckAuth';
import TrafficAdvisory from '../pages/Traffic';
import E_app_Apply from '../pages/E-app_Apply';
import BarangayClearance from '../pages/BarangayClearance';
import E_Health from '../pages/E-Health';
import MedicalAppointment from '../pages/MedicalAppointment';
import Profile from '../pages/Profile';
import UserTicket from '../pages/UserTicket';
import Ticket from '../pages/Ticket';
import TicketDashboard from '../pages/TicketDashboard';
import PredictiveTickets from '../pages/PredictiveTickets';
import IncidentReportThread from '../pages/BlotterTicketPage1';
import ForumThread from '../pages/NormalTicketPage';
import TicketView from '../pages/TicketView';

const UserRoutes = () => [
  // Authenticated Routes
  <Route path="/" element={<CheckAuth><Authenticated_Layout /></CheckAuth>}>
    <Route path="/dashboard" element={<CheckAuth><Dashboard /></CheckAuth>} />
    <Route path="/ulat-trapiko" element={<CheckAuth><TrafficAdvisory /></CheckAuth>} />
    <Route path="/e-application" element={<CheckAuth><E_app_Apply /></CheckAuth>} />
    <Route path="/e-application/barangay-clearance" element={<CheckAuth><BarangayClearance /></CheckAuth>} />
    <Route path="/e-health" element={<CheckAuth><E_Health /></CheckAuth>} />
    <Route path="/e-health/:type" element={<CheckAuth><MedicalAppointment /></CheckAuth>} />
    <Route path="/profile" element={<CheckAuth><Profile /></CheckAuth>} />
    <Route path="/ticket" element={<CheckAuth><Ticket /></CheckAuth>} />
    <Route path="/my-tickets" element={<CheckAuth><UserTicket /></CheckAuth>} />
    <Route path="/ticket-dashboard" element={<CheckAuth><TicketDashboard /></CheckAuth>} />
    <Route path="/predictive-tickets" element={<CheckAuth><PredictiveTickets /></CheckAuth>} />
    <Route path="/ticket/1" element={<CheckAuth><TicketView /></CheckAuth>} />
    <Route path="/traffic" element={<CheckAuth><TrafficAdvisory /></CheckAuth>} />
    <Route path="/incidentreportthread" element={<CheckAuth><IncidentReportThread /></CheckAuth>} />
    <Route path="/normalticketpage" element={<CheckAuth><ForumThread /></CheckAuth>} />
  </Route>,
]

export default UserRoutes;
