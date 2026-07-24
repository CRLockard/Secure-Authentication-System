import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../services/authService";

// This page handles the login form and stores the signed-in user information.
function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await signinUser(formData);
      const user = response.data.data;

      // We save the user info in localStorage so the welcome page can read it.
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/welcome");
    } catch (error) {
      const message = error.response?.data?.message || "Sign in failed.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="signin-email">Email</label>
        <input
          type="email"
          id="signin-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="signin-password">Password</label>
        <input
          type="password"
          id="signin-password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
