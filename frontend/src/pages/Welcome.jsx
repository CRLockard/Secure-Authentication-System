import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// The welcome page reads the saved user from localStorage and displays a friendly message.
function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (!savedUser) {
      navigate("/signin");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="card welcome-card">
      <h1>Welcome {user.role === "admin" ? "Admin" : "Customer"}</h1>
      <p>You are signed in as {user.email}.</p>
      <p>Your role is {user.role}.</p>
    </div>
  );
}

export default Welcome;
