import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  }

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    let register_url = window.location.origin + "/djangoapp/register";
    
    try {
      // Send POST request to register endpoint
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userName": userName,
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
          "email": email
        }),
      });
      
      const json = await res.json();
      
      if (json.status) {
        // Save username in session and reload home
        sessionStorage.setItem('username', json.userName);
        alert("Registration successful! Welcome " + json.userName);
        window.location.href = window.location.origin;
      } else if (json.error === "Already Registered") {
        alert("The user with same username is already registered");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", maxWidth: "500px", margin: "0 auto" }}>
      <div className="header" style={{ 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <span className="text" style={{ flexGrow: "1", fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
          Sign Up
        </span> 
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          justifySelf: "end", 
          alignSelf: "start" 
        }}>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              gohome();
            }} 
            style={{ 
              justifyContent: "space-between", 
              alignItems: "flex-end",
              textDecoration: "none"
            }}
          >
            <img 
              style={{ width: "1cm", cursor: "pointer" }} 
              src={close_icon} 
              alt="Close"
            />
          </a>
        </div>
      </div>
      
      <form onSubmit={register} style={{ width: "100%" }}>
        <div className="inputs" style={{ marginBottom: "20px" }}>
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={user_icon} className="img_icon" alt='Username' />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              className="input_field" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={user_icon} className="img_icon" alt='First Name' />
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              className="input_field" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={user_icon} className="img_icon" alt='Last Name' />
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              className="input_field" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={email_icon} className="img_icon" alt='Email' />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              className="input_field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={password_icon} className="img_icon" alt='Password' />
            <input 
              name="psw" 
              type="password" 
              placeholder="Password" 
              className="input_field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <div className="input" style={{ marginBottom: "15px" }}>
            <img src={password_icon} className="img_icon" alt='Confirm Password' />
            <input 
              name="confirm_psw" 
              type="password" 
              placeholder="Confirm Password" 
              className="input_field" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
        </div>
        
        <div className="submit_panel">
          <input 
            className="submit" 
            type="submit" 
            value={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          />
        </div>
      </form>
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Already have an account? 
          <a 
            href="/login" 
            style={{ 
              color: "#667eea", 
              textDecoration: "none", 
              marginLeft: "5px",
              fontWeight: "600"
            }}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register;
