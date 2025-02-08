import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import AnalystRecommendation from "./components/AnalystRecommendation";
import NavigationBar from "./components/NavigationBar";
import "./App.css";

function App() {
  const [token, setToken] = useState<string | null>(null);
  // We'll use resetKey to force a remount of AnalystRecommendation when needed.
  const [resetKey, setResetKey] = useState<number>(Date.now());

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
    // When the app mounts (full reload), update the resetKey so that the dashboard remounts fresh.
    setResetKey(Date.now());
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    // Optionally, you can force a remount here as well:
    setResetKey(Date.now());
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {token ? (
          <Route
            path="/"
            element={
              <>
                <NavigationBar onLogout={handleLogout}/>
                <Outlet />
              </>
            }
          >
            {/* When the user navigates to "/" the index route renders AnalystRecommendation */}
            <Route index element={<AnalystRecommendation key={resetKey} />} />
            {/* Optionally, you can still have a dedicated dashboard route */}
            <Route path="dashboard" element={<AnalystRecommendation key={resetKey} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;