import { Link } from "react-router-dom";
import "./Auth.css";

function Home() {
  return (
  
  
    <div className="home-container">
      <header className="home-header">
        <Link to="/" className="logo-link">
          <div className="logo">mySalon<span>.</span></div>
        </Link>
      </header>
      <div className="gradient-bg"></div>

      <div className="hero">
        <h1>
          Elevate Your <span>Salon Experience</span>
        </h1>

        <p>
          Book premium beauty & wellness services with a seamless, modern
          experience designed just for you.
        </p>

        <div className="buttons">
          <Link to="/signup" className="btn primary">
            Get Started
          </Link>

          <Link to="/login" className="btn glass">
            Login
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default Home;