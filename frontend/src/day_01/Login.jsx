import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../API/authServices";

function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "phone") {
    
    const cleanValue = value.replace(/\D/g, ""); 
    setFormData({ ...formData, [name]: cleanValue });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  async function handleLogin(e) {
    e.preventDefault();
     
    try {
      const res= await loginUser(formData);
      if (res.status === 200) {
        alert(`Welcome back, ${res.data.name}!`);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid Phone or Password";
      alert(errorMsg);
    }
  }   

  return (
    
    <div className="auth-container">
      
      <div className="gradient-bg"></div>

      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue your experience</p>

        <input
          type="tel"
          name="phone"
          maxLength={10}
          placeholder="Phone Number"
          onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;