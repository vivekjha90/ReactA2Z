import React, { useState, useEffect } from "react";
import "/src/styles/servicepage.css";

import {
  createService,
  deleteService,
  getAllServices,
  getAllSpecialist,
  updateServices,
} from "../API/menuPages";
import { bookAppointments } from "../API/appointment";

const Services = () => {
  const [specialists, setSpecialists] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    serviceId: "",
    serviceName: "",
    specialist: "",
    date: "",
    phone: "",
    name: "",
  });
  const role = localStorage.getItem("userRole"); // Get the user role

  //getSpecialist
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const res = await getAllSpecialist();
        setSpecialists(res.data);
      } catch (err) {
        console.error("Error fetching specialists:", err);
      }
    };
    fetchSpecialists();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    category: "Grooming",
  });
  const [editId, setEditId] = useState(null);

  const handleOpenBooking = (service) => {
    const savedName = localStorage.getItem("userName");
    const savedPhone = localStorage.getItem("userPhone");
    setBookingData({
      ...bookingData,
      serviceId: service._id,
      serviceName: service.name,
      specialist: "", // Reset for new booking
      date: "",
      name: savedName || "",
      phone: savedPhone || "",
    });
    setShowModal(true);
  };
  const handleBookingSubmit = async () => {
    // Use data from the modal state directly
    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.specialist ||
      !bookingData.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      name: bookingData.name,
      phone: Number(bookingData.phone), // Now this won't be NaN
      serviceName: bookingData.serviceName,
      specialist: bookingData.specialist,
      appointmentDate: new Date(bookingData.date),
    };

    try {
      await bookAppointments(payload);
      alert("Appointment Booked Successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Server Error:", err.response?.data);
      alert("Error: " + (err.response?.data?.error || "Booking failed"));
    }
  };

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

  const handleSave = async () => {
    try {
      if (editId) {
        await updateServices(editId, formData);
      } else {
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
        <h1>{role === "user" ? "Available Services" : "Services Menu"}</h1>
        <p>
          {role === "user"
            ? "Choose a service to book your appointment"
            : "Track and manage your services"}
        </p>
        <div className="reminder-header-divider"></div>
      </div>

      {/* 1. HIDE FORM IF ROLE IS 'user' */}
      {role !== "user" && (
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
      )}

      <div className="services-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <div className="card-top">
              <span className="category-badge">{service.category}</span>
              <span className="service-price">₹{service.price}</span>
            </div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-duration"> {service.duration} minutes</p>

            <div className="card-actions">
              {/* 2. SHOW BOOK BUTTON FOR 'user' */}
              {role === "user" ? (
                <button
                  type="button" 
                  onClick={() => handleOpenBooking(service)} 
                  className="add-service-btn"
                  style={{
                    textAlign: "center",
                    width: "100%",
                    cursor: "pointer",
                    border: "none", 
                  }}
                >
                  Book Now
                </button>
              ) : (
                /* 3. SHOW EDIT/DELETE FOR OTHERS */
                <>
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service._id)}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* --- BOOKING MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h2>Book {bookingData.serviceName}</h2>
            </div>

            <div className="booking-form">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="service-input"
                value={bookingData.name}
                onChange={(e) =>
                  setBookingData({ ...bookingData, name: e.target.value })
                }
              />

              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter your phone"
                className="service-input"
                value={bookingData.phone}
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
              />
              <label>Select Specialist</label>
              <select
                className="service-input"
                value={bookingData.specialist}
                onChange={(e) =>
                  setBookingData({ ...bookingData, specialist: e.target.value })
                }
              >
                <option value="">Choose a specialist</option>

                {/* 
      1. Filter for status 'available'
      2. Filter for expertise matching current serviceName 
  */}
                {specialists
                  .filter(
                    (spec) =>
                      spec.status === "Available" &&
                      spec.expertise === bookingData.serviceName,
                  )
                  .map((spec) => (
                    <option key={spec._id} value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
              </select>

              <label>Select Date</label>
              <input
                type="date"
                className="service-input"
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
              />

              <div className="modal-actions">
                <button
                  className="add-service-btn"
                  onClick={handleBookingSubmit}
                >
                  Confirm Appointment
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
