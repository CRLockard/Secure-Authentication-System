import { Link } from "react-router-dom";

// The home page introduces the app and gives the user clear entry points.
function Home() {
  return (
    <div className="card home-card">
      <h1>Welcome to the Authentication App</h1>
      <p>
        This simple MERN project lets users sign up, sign in, and see a welcome
        message based on their account role.
      </p>
      <div className="button-row">
        <Link to="/signup" className="primary-link">
          Create an Account
        </Link>
        <Link to="/signin" className="secondary-link">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Home;
