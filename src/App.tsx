import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import SignUp from "./layouts/authentication/sign-up/sign-up";
import SignIn from "layouts/authentication/sign-in/sign-in";
import LandingPage from "layouts/landing-page/landing-page";
import Dashboard from "layouts/dashboard/dashboard";

import "./i18n"; // language i18n configuration
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<div>Terms of Service Page</div>} />
        {/* Redirect from root to /signup */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
