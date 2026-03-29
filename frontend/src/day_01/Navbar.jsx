import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  
  
  const token = localStorage.getItem("token");

 
  const handleLogout = () => {
    if(!window.confirm("Do you want to logout")) return ;
    localStorage.clear(); 
    alert("Logged out successfully!");
    navigate("/login");
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="logo">mySalon</div>
      <div className="nav-links">
        

        
        {!token ? (
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
