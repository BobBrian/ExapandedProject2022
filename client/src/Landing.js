import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to Expanded Project 2022</h1>
      <p>Sign In and start Reviewing Restaurants</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <div>
        
      </div>
      <div>
        
      </div>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;