import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

function Public_Layout() {
  return (
    <div id="user-layout">

      <Outlet />
    </div>
  )
}

export default Public_Layout;
