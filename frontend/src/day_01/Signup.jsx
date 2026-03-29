import { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API/authServices";
function Signup() {
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role:"owner",
  });
 const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

 async function newUser(e) {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      if (res.status === 201 || res.status === 200) {
        alert(res.data.message || "Registration Successful!");
        setFormData({
          name: "",
          phone: "",
          password: "",
          role: "owner",
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "User is not registered";
      alert(errorMsg);
    }
  }
  return (
    <div className="auth-container">
      <div className="gradient-bg"></div>

      <form className="auth-card" onSubmit={newUser}>
        <h2>Create Account ✨</h2>
        <p className="auth-subtitle">
          Join us and elevate your salon experience
        </p>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="auth-select"
        >
          <option value="owner">Owner</option>
          <option value="staff">Staff / Internal User</option>
          <option value="specialist">Specialist</option>
        </select>

        <button type="submit" className="auth-btn">
          Sign Up
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;