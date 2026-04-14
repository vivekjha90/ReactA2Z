import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/styles/visitor.css";
import { createVisitor, deleteVisitor, getAllVisitor, sendTheReminder, updateVisitor } from "../API/menuPages";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    phone: "",
    service: "",
  });

  

  const fetchVisitors = async () => {
    try {
      const res = await getAllVisitor();
      setVisitors(res.data);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Save and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        
        await updateVisitor(id, formData);
      } else {
        
        await createVisitor(formData);
      }

      fetchVisitors();
      resetForm();
    } catch (err) {
      console.error("Error saving visitor:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this visitor?")) {
      try {
        await deleteVisitor(id);
        setVisitors(visitors.filter((v) => v._id !== id));
      } catch (err) {
        console.error("Error deleting visitor:", err);
      }
    }
  };

  const sendReminder = async (id) => {
    try {
      await sendTheReminder(id);
      alert("Reminder sent successfully");

      fetchVisitors();
    } catch (err) {
      console.error(err);
      alert("Error sending reminder ");
    }
  };
  const handleEdit = (v) => {
    setEditId(v._id);
    setFormData({
      name: v.name,
      date: v.date,
      phone: v.phone,
      service: v.service,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: "",
      date: new Date().toISOString().split("T")[0],
      phone: "",
      service: "",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "In Service":
        return "status-in-service";
      case "Waiting":
        return "status-waiting";
      case "Completed":
        return "status-completed";
      default:
        return "status-waiting";
    }
  };

  return (
    <div className="visitor-container">
      <div className="visitor-header">
        <h1></h1>
        <div className="reminder-header">
          <h1>Visitor Management</h1>
          <p>Schedule visits and track real-time salon entries.</p>
          <div className="reminder-header-divider"></div>
        </div>
      </div>

      <div className="visitor-layout">
        <div className="form-section">
          <div className="form-card">
            <h3 className="form-title">
              {editId ? "Update Visitor" : "New Check-In"}
            </h3>
            <form className="visitor-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="label-style">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Visitor's Name"
                  className="input-style"
                  required
                />
              </div>

              <div className="input-group">
                <label className="label-style">Visit Date</label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  className="input-style"
                  required
                />
              </div>

              <div className="input-group">
                <label className="label-style">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Contact Number"
                  className="input-style"
                  required
                />
              </div>

              <div className="input-group">
                <label className="label-style">Service Required</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="input-style"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Hair Cut">Hair Cut</option>
                  <option value="SPA">SPA</option>
                  <option value="Massage">Massage</option>
                </select>
              </div>

              <div className="button-group">
                <button type="submit" className="check-in-btn">
                  {editId ? "Update Visit" : "Confirm Visit"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="log-section">
          <div className="log-card">
            <h3 className="form-title">Recent Visitor Log</h3>
            <table className="visitor-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Visitor</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>TimeIn</th>
                  <th style={{"textAlign":"center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v._id}>
                    <td>{v.date}</td>
                    <td>
                      <div className="visitor-info-name">{v.name}</div>
                      <div className="visitor-info-phone">{v.phone}</div>
                    </td>
                    <td>{v.service}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(v.status)}`}
                      >
                        {v.status || "Waiting"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(v.timeIn)}`}
                      >
                        {v.timeIn}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(v)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(v._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="reminder-btn"
                          onClick={() => sendReminder(v._id)}
                          disabled={v.reminderSent}
                        >
                          {v.reminderSent ? "Sent" : "Send Reminder"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
