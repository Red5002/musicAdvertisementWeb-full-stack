import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
// import LoadingIndicator from "../components/loadingIndicator";
// import "../styles/loadingIndicator.css";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    let intervalId;

    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      const tokenExpiration = decoded.exp;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);

        // Schedule refresh 30 seconds before token expires
        const refreshTime = (tokenExpiration - now - 30) * 1000;
        if (refreshTime > 0) {
          intervalId = setTimeout(refreshToken, refreshTime);
        }
      }
    };

    auth().catch(() => setIsAuthorized(false));

    return () => clearTimeout(intervalId); // clean up on unmount
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="loading-body">
        {/* <LoadingIndicator /> */}
        Loading...
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
