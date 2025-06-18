import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPge from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/auth/Login";
import DashboardLayout from './pages/DashboardLayout'

function App() {

  return (
    <>
     <Router>
        <Routes>
          {/* <Route path="/user/register" element={<SignUp />} />
          */}
          <Route path="/" element={<LandingPge />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />          
          <Route path="*" element={<NotFound />} />
         </Routes>

          </Router>

    </>
  )
}

export default App
