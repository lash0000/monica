import { Route } from 'react-router-dom';
import Authenticated_Layout from '../layouts/Authenticated';
import Dashboard from '../pages/Dashboard';
import CheckAuth from '../../../lib/CheckAuth';
import TrafficAdvisory from '../pages/Traffic';
import E_app_Apply from '../pages/E-app_Apply';
import E_app_Bonafied from '../pages/E-app_Bonafied';
import BarangayClearance from '../pages/BarangayClearance';
import E_Health from '../pages/E-Health';
import MedicalAppointment from '../pages/MedicalAppointment';
import Profile from '../pages/Profile';
import UserTicket from '../pages/UserTicket';
import Ticket from '../pages/Ticket';
import PredictiveTickets from '../pages/PredictiveTickets';
import CrimePreventionReport from '../pages/2ndPredictiveTickets';
import IncidentReportThread from '../pages/BlotterTicketPage1';
import ForumThread from '../pages/NormalTicketPage';
import TicketView from '../pages/TicketView';
import MyApplications from '../pages/MyApplications';
import ApplicationStatus from '../pages/ApplicationStatus';
import BlotterTicketUrgency from '../pages/BlotterTicketUrgency';
import BlotterTicketResolved from '../pages/BlotterTicketResolved';
import BlotterTicketUnresolved from '../pages/BlotterTicketUnresolved';
import BlotterTicketStaffAssign from '../pages/BlotterTicketStaffAssign';
import BlotterTicketModal from '../pages/BlotterTicketModal';
import UpdateProfile from '../pages/UpdateProfile';
import FileTicket from '../pages/FileTicket';
import ApplicationForm from '../pages/ApplicationForm';

const UserRoutes = () => [
  <Route
    key="authenticated"
    element={<CheckAuth><Authenticated_Layout /></CheckAuth>}
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="ulat-trapiko" element={<TrafficAdvisory />} />
    <Route path="e-application" element={<E_app_Apply />} />
    <Route path="e-application/:id" element={<ApplicationForm />} />
    <Route path="my-applications" element={<MyApplications />} />
    <Route path="my-applications/:id" element={<ApplicationStatus />} />
    <Route path="e-health" element={<E_Health />} />
    <Route path="e-health/:type" element={<MedicalAppointment />} />
    <Route path="profile" element={<Profile />} />
    <Route path="profile/update-profile" element={<UpdateProfile />} />
    <Route path="ticket" element={<Ticket />} />
    <Route path="ticket/:id" element={<TicketView />} />
    <Route path="my-tickets" element={<UserTicket />} />
    <Route path="my-tickets/add-new-ticket" element={<FileTicket />} />
    <Route path="predictive-tickets" element={<PredictiveTickets />} />
    <Route path="2nd-predictive-tickets" element={<CrimePreventionReport />} />
    <Route path="blotter-ticket-page-1" element={<IncidentReportThread />} />
    <Route path="blotter-ticket-resolved" element={<BlotterTicketResolved />} />
    <Route path="blotter-ticket-unresolved" element={<BlotterTicketUnresolved />} />
    <Route path="blotter-ticket-staff" element={<BlotterTicketStaffAssign />} />
    <Route path="blotter-ticket-urgency" element={<BlotterTicketUrgency />} />
    <Route path="blotter-ticket-modal" element={<BlotterTicketModal />} />
    <Route path="normal-ticket-page" element={<ForumThread />} />
    <Route path="traffic" element={<TrafficAdvisory />} />
  </Route>
]

export default UserRoutes;
