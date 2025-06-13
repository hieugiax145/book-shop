import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout.js";
import UserLayout from "./pages/user/UserLayout.js";
import PlaceOrder from "./pages/admin/sale/PlaceOrder.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route
            path="/login"
            element={
              localStorage.getItem("nguoiDungId") ? (
                localStorage.getItem("vaiTro") === "Admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/*"
            element={
              localStorage.getItem("nguoiDungId") &&
              localStorage.getItem("vaiTro") === "Admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/sale"
            element={
              localStorage.getItem("vaiTro") === "Admin" ? (
                <PlaceOrder />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
