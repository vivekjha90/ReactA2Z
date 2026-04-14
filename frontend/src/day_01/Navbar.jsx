import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../API/authServices";


function Navbar() {
  const navigate = useNavigate();
  
  
  const role = localStorage.getItem("userRole");

 
  const handleLogout = async () => {
  if (!window.confirm("Do you want to logout")) return;

  try {
   
    await logoutUser();
   
    localStorage.clear();

    alert("Logged out successfully!");
    navigate("/login");

  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  return (
    <nav className="navbar">
      <div className="logo">mySalon</div>
      <div className="nav-links">
        

        
        {!role ? (
          <>
            {/* <Link to="/home" className="home">Home</Link> */}
            {/* <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link> */}
            
          </>
        ) : (
          
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
