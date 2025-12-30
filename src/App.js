import React from "react";
import LandingPage from "./LandingPage";
import Portfolio from "./Portfolio.jsx";
import Portfolio1 from "./Portfolio1.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignUpForm.jsx";
import ImageStudioPage from "./ImageStudioPage.jsx";
import { Routes, Route } from "react-router-dom";
import Portfolio2 from "./Portfolio2.jsx";
import App1 from "./App1.js";
import StudentLogin from "./StudentLogin.jsx";
import History1 from "./History1.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import StudentDiscounts from "./LoggedIn.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<StudentDiscounts />} />

      <Route path="/saurabhgalgale" element={<Portfolio />} />
      <Route path="/saurabhgalgale1" element={<Portfolio1 />} />
      <Route path="/saurabhgalgale2" element={<Portfolio2 />} />
      <Route path="/studio-login" element={<App1 />} />

      {/* <Route path="/signup" element={<SignupForm />} /> */}

      <Route
        path="/studio"
        element={
          <ProtectedRoute>
            <ImageStudioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History1 />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
