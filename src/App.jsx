import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPge from "./pages/HomePage";

function App() {

  return (
    <>
     <Router>
        <Routes>
          {/* <Route path="/user/register" element={<SignUp />} />
          <Route path="/user/login" element={<Login />} /> */}
          <Route path="/" element={<LandingPge />} />
         </Routes>

          </Router>

    </>
  )
}

export default App
