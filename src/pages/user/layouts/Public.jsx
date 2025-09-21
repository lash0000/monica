import { Outlet } from "react-router-dom";
import { Footer, Navbar_Public } from "../components/Navbar";

function Public_Layout() {
  return (
    <div id="public-wrapper">
      <Navbar_Public />
      <main id="matatag-taumbayan">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Public_Layout;
