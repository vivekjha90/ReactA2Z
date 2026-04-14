import Navbar from "./day_01/Navbar";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./day_01/Home";
import Login from "./day_01/Login";
import Signup from "./day_01/Signup";
import Dashboard from "./day_01/Dashboard";
import Visitors from "./pages/Visitors";
import Analytics from "./pages/Analytics";
import Remainder from "./pages/Remainder";
import Services from "./pages/Services";
import Staff from "./pages/Staff";
import Specialists from "./pages/Specialists";
import ProtectedRoute from "./day_01/ProtectedRoute";

function App() {
  const AuthenticatedLayout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                <Route path="staff" element={<Staff />} />
              </Route>

              <Route
                element={<ProtectedRoute allowedRoles={["owner", "staff"]} />}
              >
                <Route path="visitors" element={<Visitors />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["owner", "specialist", "user"]}
                  />
                }
              >
                <Route path="services" element={<Services />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                <Route path="specialists" element={<Specialists />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                <Route path="remainder" element={<Remainder />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
