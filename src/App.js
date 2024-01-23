import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import StatsLive from "./pages/StatsLive";
import Blank from "./pages/Blank";
import LoginForm from "./pages/signIn/LoginForm";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import StatsParDate from "./pages/StatsParDate";
import AdminPage from "./pages/components/AdminPage";
import Stores from "./pages/Stores";
import { ProgressSpinner } from 'primereact/progressspinner';
import 'moment/locale/fr';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = Cookies.get("loggedIn") === "loggedIn";
      setLoggedIn(isLoggedIn);

      const token = Cookies.get("access_token");
   
      if (token) {
        const decodedToken = await parseJwt(token);
        setUserRole(decodedToken ? decodedToken.Role : "");
        console.log(userRole);
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<MainLayout />}>
              <Route index  element={<Blank />} />

            {userRole === "store" && (
              <>
                <Route index path="/StateLive" element={<StatsLive />} />
                <Route path="/StateParDate" element={<StatsParDate />} />
                </>
            )}

            {userRole === "admin" && (
              <>
              <Route   path="/AdminPage" element={<AdminPage />} />
              <Route   path="/Store" element={<Stores />} />
              </>
              
            )}
          </Route>

        ) : (
          <Route path="*" element={<LoginForm />} />
        )}
      </Routes>
    </BrowserRouter >
  );
}

export default App;