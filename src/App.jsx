import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import AppsOverview from "@/components/pages/AppsOverview";
import UserAnalytics from "@/components/pages/UserAnalytics";
import AILogAnalysis from "@/components/pages/AILogAnalysis";
import Reports from "@/components/pages/Reports";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AppsOverview />} />
            <Route path="user-analytics" element={<UserAnalytics />} />
            <Route path="ai-logs" element={<AILogAnalysis />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
        />
      </div>
    </Router>
  );
}

export default App;