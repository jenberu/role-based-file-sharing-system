import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPge from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashBoard from "./components/layout/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/user/register" element={<SignUp />} />
           */}
          <Route path="/" element={<LandingPge />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/*" element={<DashBoard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
