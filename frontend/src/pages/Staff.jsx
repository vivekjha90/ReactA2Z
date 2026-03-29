import React, { useState, useEffect } from "react";
import axios from "axios";
import '/src/styles/staffPage.css'
import { createStaff, deleteStaff, getAllStaff, updateStaff } from "../API/menuPages";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "specialist",
    phone: ""
  });
  const [editId, setEditId] = useState(null);

  async function fetchStaff() {
    try {
      const res = await getAllStaff();
      setStaffList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateStaff(editId,formData);
        alert("Staff updated successfully");
      } else {
        const res = await createStaff(formData);
        alert(res.data.message);
      }
      fetchStaff();
      handleCancel(); // Resets form 
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await deleteStaff(id);
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  }

  
  const handleCancel = () => {
    setEditId(null);
    setFormData({ 
      name: '', 
      role: 'specialist', 
      phone: '' 
    });
  };

  function handleEdit(staff) {
    setFormData({
      name: staff.name,
      role: staff.role,
      phone: staff.phone
    });
    setEditId(staff._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="staff-container">
     <div className="reminder-header">
 
  <h1>Staff Management</h1>
  <p>Track and manage your staff</p>
  <div className="reminder-header-divider"></div>
</div>

      <div className="staff-card">
        <h3>{editId ? "Edit Staff Member" : "Add New Staff Member"}</h3>

        <form onSubmit={handleSubmit} className="staff-form">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="staff-input"
              required
            />
          </div>

          <div>
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="staff-input"
            >
              <option value="specialist">Specialist</option>
              <option value="receptionist">Receptionist</option>
              <option value="helper">Helper</option>
            </select>
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="staff-input"
              required
            />
          </div>

          
          <div className="staff-form-actions">
            <button type="submit" className="staff-btn">
              {editId ? "Update Staff" : "Add Staff"}
            </button>

            {editId && (
              <button type="button" className="staff-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="staff-table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>
                  <span className="staff-badge">{staff.role}</span>
                </td>
                <td>{staff.phone}</td>
                <td className="staff-actions">
                  <button className="staff-edit" onClick={() => handleEdit(staff)}>Edit</button>
                  <button onClick={() => handleDelete(staff._id)} className="staff-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
