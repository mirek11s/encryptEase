import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./layouts/authentication/sign-up/sign-up";
import LandingPage from "layouts/landing-page/landing-page";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes as needed */}
        <Route path="/terms" element={<div>Terms of Service Page</div>} />
        {/* Redirect from root to /signup */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
