import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(userData);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  const logOut = function () {
    setUserData(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  function RouteGuard({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
  return (
    <>
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route
            path=""
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login saveUserData={saveUserData} />}
          />
        </Routes>
      </div>
    </>
  );
}
