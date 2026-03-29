import { useEffect, useState } from "react";
import axios from "axios";
import "/src/styles/reminder.css"; 
import { reminder } from "../API/menuPages";
const Reminder = () => {
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
      reminder()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="reminder-container">
      <div className="reminder-header">
        <h1>Reminder Dashboard</h1>
        <p>Users who received reminder messages</p>
      </div>

      <div className="reminder-card">
        <table className="reminder-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Reminder Date</th>
              <th>Reminder Count</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.phone}</td>
                  <td>{new Date(u.date).toLocaleDateString()}</td>

                  <td>{u.reminderCount}1</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No reminders sent yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminder;
