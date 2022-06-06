import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to Resturant Reviewer 2022</h1>
      <h2>Created by Chibuikem Nwauche</h2>

      <Link to="/login" >
         <button type="button">
          Login Into Your Account 
        </button>
      </Link>
      
      <Link to="/register" >
        <button type="button">
            Create an Account
        </button>
      </Link>
    </div>
  );
};

export default Landing;