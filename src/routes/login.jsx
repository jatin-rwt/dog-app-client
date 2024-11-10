import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../common";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!!token) {
      navigate("/blogs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the server returns a JWT token on successful login
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", data.name); // Store token in localStorage
        console.log("Logged in successfully");
        navigate("/blogs");
        // Redirect or update UI based on the successful login
      } else {
        // Handle errors (e.g., incorrect credentials)
        //   setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // setError('An error occurred. Please try again later.');
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in to Airbnb</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="additional-options">
          <p>
            Don’t have an account? <a href="#signup">Sign up</a>
          </p>
          <p>
            <a href="#forgot-password">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
