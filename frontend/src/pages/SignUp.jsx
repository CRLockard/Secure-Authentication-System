import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

// This page is responsible for the registration form and feedback to the user.
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      setErrorMessage("Please fill out every field.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await signupUser(formData);
      setSuccessMessage(response.data.message);
      setFormData({ email: "", password: "", role: "customer" });

      // After a successful registration, the user is nudged to sign in.
      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          id="signup-password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
