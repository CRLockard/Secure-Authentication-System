import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";

// This is the main app component. It sets up the navigation and routes.
function App() {
  const navigate = useNavigate();

  // This function clears the saved user info and returns the user to the home page.
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          MERN Auth
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
