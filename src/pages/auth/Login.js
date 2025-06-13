import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";
import apiServices from "../../services/apiServices";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiServices.login(formData);
      if (response.success) {
        console.log(response.data);
        localStorage.setItem("nguoiDungId", response.data.nguoiDungId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("vaiTro", response.data.vaiTro);
        toast.success("Đăng nhập thành công");
        if (response.data.vaiTro === "Admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Đăng nhập</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Đăng nhập
          </button>
        </form>
        <p className="auth-link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
