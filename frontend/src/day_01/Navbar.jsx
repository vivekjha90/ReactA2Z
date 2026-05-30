import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../API/authServices";
import Swal from "sweetalert2";


function Navbar() {
  const navigate = useNavigate();
  
  
  const role = localStorage.getItem("userRole");

 
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Do you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      await logoutUser();
      localStorage.clear();

      await Swal.fire({
        title: 'Logged out successfully!',
        icon: 'success'
      });
      navigate("/login");

    } catch (err) {
      console.error("Logout failed:", err);
      Swal.fire({
        title: 'Logout failed',
        text: 'An error occurred during logout.',
        icon: 'error'
      });
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
