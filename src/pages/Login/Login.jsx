import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { isLogged } from "../../components/Store/Reducers/moviesSlice";


function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user_data } = useSelector((data) => data);
  const dispatch = useDispatch()
  

  function handleSubmit(event) {
    event.preventDefault();
    const inputsData = {
      login: event.target.form[0].value,
      password: event.target.form[2].value,
    }

    if (user_data.login === inputsData.login && user_data.password === inputsData.password) {
      navigate("/");
      dispatch(isLogged(true));
    } else {
      setError(true);
    }

    
  }
  function handleRegistration(event) {
    event.preventDefault();
    navigate("/registration");
  }

  return (
    <form className="login-form">
      <h3>Enter your login and password please</h3>
      {error ? <>
      <TextField
        error
        id="outlined-required"
        label="Email or username"
        helperText='Check username to be correct or registration a new'
      />
      <TextField
        error
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        helperText='Password is not correct'
      /></> : <>
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
      /></>}
      
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
