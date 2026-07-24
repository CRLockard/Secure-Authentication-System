import { useState } from "react";

// This reusable form component keeps the signup and signin pages simple.
function AuthForm({
  title,
  submitLabel,
  onSubmit,
  errorMessage,
  successMessage,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");
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
      setValidationError("Please fill in both email and password.");
      return;
    }

    setValidationError("");
    setIsLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        {validationError && <p className="error-message">{validationError}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
