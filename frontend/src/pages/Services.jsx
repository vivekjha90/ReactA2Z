import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/styles/servicepage.css";
import { createService, deleteService, getAllServices, updateServices } from "../API/menuPages";

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    category: "Grooming",
  });
  const [editId, setEditId] = useState(null);

 

  // 1. Fetch all
  const fetchServices = async () => {
    try {
      const res = await getAllServices();
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Save or Update
  const handleSave = async () => {
    try {
      if (editId) {
        // PUT update
        await updateServices(editId,formData);
      } else {
        // POST create
        await createService(formData);
      }

      fetchServices();
      resetForm();
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", duration: "", category: "Grooming" });
    setEditId(null);
  };

  const startEdit = (service) => {
    setEditId(service._id);
    setFormData({
      name: service.name,
      price: service.price,
      duration: service.duration,
      category: service.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this service?")) {
      try {
        await deleteService(id);
        setServices(services.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Error deleting service:", err);
      }
    }
  };

  return (
    <div className="services-container">
      <div className="reminder-header">
         <h1>Services Menu</h1>
        <p>Track and manage your services</p>
        <div className="reminder-header-divider"></div>
      </div>
      <div className="form-card">
        <h3 className="form-title">
          {editId ? "Edit Service" : "Create New Service"}
        </h3>
        <div className="form-inputs">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
            placeholder="Service Name"
            className="service-input"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Price (₹)"
            className="service-input"
          />
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="text"
            placeholder="Duration (e.g. 30 min)"
            className="service-input"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="service-input"
          >
            <option value="Grooming">Grooming</option>
            <option value="Wellness">Wellness</option>
            <option value="Beauty">Beauty</option>
          </select>

          <button className="add-service-btn" onClick={handleSave}>
            {editId ? "Update Service" : "Confirm Service"}
          </button>

          {editId && (
            <button className="delete-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <div className="card-top">
              <span className="category-badge">{service.category}</span>
              <span className="service-price">₹{service.price}</span>
            </div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-duration">⏳ {service.duration} minutes</p>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => startEdit(service)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(service._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
