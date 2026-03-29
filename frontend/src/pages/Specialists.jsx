import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/styles/specialistPage.css";
import { createSpecialist, deleteSpecialist, getAllSpecialist, updateSpecialist } from "../API/menuPages";

const Specialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    level: "Senior",
  });
  const [editId, setEditId] = useState(null);

 

  // 1. Fetch Specialists
  const fetchSpecialists = async () => {
    try {
      const res = await getAllSpecialist();
      setSpecialists(res.data);
    } catch (err) {
      console.error("Error fetching specialists:", err);
    }
  }; 

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 2. Save or Update
  const handleSave = async () => {
    try {
      if (editId) {
        // PUT update
        await updateSpecialist(editId, formData);
      } else {
        // POST create
        await createSpecialist(formData);
      }

      fetchSpecialists();
      resetForm();
    } catch (err) {
      console.error("Error saving specialist:", err);
    }
  };

  // 3. Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this specialist?")) {
      try {
        await deleteSpecialist(id);
        setSpecialists(specialists.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Error deleting specialist:", err);
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ name: "", expertise: "", experience: "", level: "Senior" });
  };

  const startEdit = (spec) => {
    setEditId(spec._id);
    setFormData({
      name: spec.name,
      expertise: spec.expertise,
      experience: spec.experience,
      level: spec.level,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="reminder-header">
        <h1>Specialists Directory</h1>
        <p>Track and manage your specialists</p>
        <div className="reminder-header-divider"></div>
      </div>

      <div className="form-card">
        <h3 className="form-title">
          {editId ? "Edit Specialist" : "Onboard New Specialist"}
        </h3>
        <div className="form-grid">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-style"
          />
          <input
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Expertise"
            className="input-style"
          />
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            type="number"
            placeholder="Years"
            className="input-style"
          />
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="input-style"
          >
            <option value="Senior">Senior</option>
            <option value="Master">Master</option>
            <option value="Celebrity">Celebrity</option>
          </select>
          <button className="save-btn" onClick={handleSave}>
            {editId ? "Update" : "Confirm"}
          </button>
          {editId && (
            <button className="outline-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="specialists-grid">
        {specialists.map((spec) => (
          <div key={spec._id} className="spec-card">
            <div className="card-header">
              <div className="avatar-circle">{spec.name.charAt(0)}</div>
              <div>
                <h3 className="spec-name">{spec.name}</h3>
                <p className="spec-expertise">
                  {spec.expertise} ({spec.level})
                </p>
                <div className="rating-container">
                  <span className="rating-star">★</span>
                  <span>{spec.rating || "0.0"}</span>
                  <span className="rating-count">
                    ({spec.clients || 4} reviews)
                  </span>
                </div>
                <span className="rating-count">
                  Experience:{spec.experience} year
                </span>
              </div>
            </div>

            <div className="button-group">
              <button className="action-btn" onClick={() => startEdit(spec)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(spec._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialists;
