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
import CrimePreventionReport from '../pages/2ndPredictiveTickets';
import IncidentReportThread from '../pages/BlotterTicketPage1';
import ForumThread from '../pages/NormalTicketPage';
import TicketView from '../pages/TicketView';
import MyApplications from '../pages/MyApplications';
import ApplicationList from '../pages/e-application-as-bonafide';

const UserRoutes = () => [
  // Pathless layout route - children are relative and match from root
  <Route
    key="authenticated"
    element={<CheckAuth><Authenticated_Layout /></CheckAuth>}
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="ulat-trapiko" element={<TrafficAdvisory />} />
    <Route path="e-application" element={<E_app_Apply />} />
    <Route path="e-application/barangay-clearance" element={<BarangayClearance />} />
    <Route path="my-applications" element={<MyApplications />} />
    <Route path="e-health" element={<E_Health />} />
    <Route path="e-health/:type" element={<MedicalAppointment />} />
    <Route path="profile" element={<Profile />} />
    <Route path="ticket" element={<Ticket />} />
    <Route path="my-tickets" element={<UserTicket />} />
    <Route path="ticket-dashboard" element={<TicketDashboard />} />
    <Route path="predictive-tickets" element={<PredictiveTickets />} />
    <Route path="2nd-predictive-tickets" element={<CrimePreventionReport />} />
    <Route path="blotter-ticket-page-1" element={<IncidentReportThread />} />
    <Route path="normal-ticket-page" element={<ForumThread />} />
    <Route path="ticket/1" element={<TicketView />} />
    <Route path="traffic" element={<TrafficAdvisory />} />
    <Route path="e-application-as-bonafide" element={<ApplicationList />} />
  </Route>
]

export default UserRoutes;
