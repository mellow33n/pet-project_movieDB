import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  

  function handleSubmit(event) {
    localStorage.setItem("AUTH_TOKEN", "qwerty");
    event.preventDefault();
    navigate("/");
  }
  function handleRegistration(event) {
    event.preventDefault();
    navigate("/registration");
  }

  return (
    <form className="login-form">
      <h3>Enter your login and password please</h3>
      <TextField
        required
        id="outlined-required"
        label="Email or username"
        color="primary"
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        color="primary"
      />
      <div className="login-buttons">
        <div className="btn-reg">
          <p>
            Don't have an account?
            <br />
            Register Now
          </p>
          <Button variant="contained" color="primary" onClick={handleRegistration}>
            Registration
          </Button>
        </div>
        <div className="btn-log">
          <Button variant="contained" color="primary" onClick={handleSubmit} type='submit'>
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Login;
