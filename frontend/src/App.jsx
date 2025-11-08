import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import FeaturesSimple from "./components/FeaturesSimple";
import GetLegalHelp from "./components/GetLegalHelp";
import Chat from "./components/Chat";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import BlogPage from "./components/BlogPage";

// ✅ Layout to handle conditional Header/Footer
const Layout = () => {
  const location = useLocation();

  // Hide header/footer only on `/chat`
  const hideHeaderFooter = location.pathname === "/chat";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<FeaturesSimple />} />
        <Route path="/get-legal-help" element={<GetLegalHelp />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

// ✅ Main App Component
const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
