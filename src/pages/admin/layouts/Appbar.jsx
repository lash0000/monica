import { Outlet } from "react-router-dom";
import { App_Footer, Appbar } from "../components/Appbar";


function App_Layout() {
  return (
    <div id="public-wrapper">
      <Appbar />
      <main id="matatag-taumbayan-app">
        <Outlet />
      </main>
      
    </div>
  )
}

export default App_Layout;
