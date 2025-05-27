import { Navigate, Route, BrowserRouter as Router,Routes } from "react-router";
import { ThemeProvider } from "../src/components/theme-provider";
import "./App.css";
import { LoginForm } from "./components/login-form";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/Layout";
import Pickup from "./features/Pickups/Pickup";
import Delivery from "./features/Delivery/Delivery";
import Vehicle from "./features/Vehicle/Vehicle";
import Register from "./features/UserRegister/Register";
import Dashboard from "./features/Dashboard/Dashboard";
import Facility from "./features/Facilities/Facility";
import  FitRoutes from "./features/FITRoutes/FitRoutes";
import Ticket from "./features/Ticket/Ticket";
import { Toaster } from "sonner";
import Data from "./features/Data/Data";
import SOS from "./features/SOS/SOS";
import Track from "./features/Track/Track";
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to='/login' />}  />
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />} path="/">
              <Route path="/admin" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />            
                <Route path="pickups" element={<Pickup />}/>
                <Route path="deliveries" element={<Delivery />} />
                <Route path='vehicles' element={<Vehicle />} />
                <Route path='facilities' element={<Facility />} />
                <Route path="routes" element={<FitRoutes />} />
                <Route path ="users" element={<Register />} />
                <Route path="sos" element={<SOS />} />
                <Route path="geofence" element={<Track />} />
                <Route path="ticket" element={<Ticket />} />
                <Route path="reports" element={<Data />} />
              </Route>
            </Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
