import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import SignUp from "./layouts/authentication/sign-up/sign-up";
import SignIn from "layouts/authentication/sign-in/sign-in";
import LandingPage from "layouts/landing-page/landing-page";
import Dashboard from "layouts/dashboard/dashboard";
import TermsOfService from "layouts/terms-of-service/terms-of-service";

// utils
import PrivateRoutes from "utils/private-routes";
import { AuthProvider } from "utils/auth-context";

import "./i18n"; // language i18n configuration
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
