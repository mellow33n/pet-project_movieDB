import "./Registration.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import {
  setUsername,
  setPassword,
} from "../../components/Store/Reducers/moviesSlice";

function Registration() {
  const navigate = useNavigate();
  const [errorName, setErrorName] = useState(false);
  const [errorPwd, setErrorPwd] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const usernameValue = event.nativeEvent.path[1][4].value;
    const pwdValue = event.nativeEvent.path[1][12].value;
    const pwdConfirmValue = event.nativeEvent.path[1][14].value;
    const regExpUsername = /^([a-z0-9]|[-._](?![-._])){2,20}$/;



    if (regExpUsername.test(usernameValue)) {
      dispatch(setUsername(usernameValue));
      if (pwdValue === pwdConfirmValue) {
        dispatch(setPassword(pwdValue));
        navigate("/login");
      } else {

        setErrorPwd(true);
      }
    } else {

      setErrorName(true);
    }

  }

  const genders = [
    {
      value: "male",
      label: "male",
    },
    {
      value: "female",
      label: "female",
    },
  ];

  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="parent">
      <form className="reg-form">
        <h3>Registration</h3>
        <TextField
          required
          id="outlined-required-firstName"
          label="First name"
          color="primary"
        />
        <TextField
          required
          id="outlined-required-secondName"
          label="Second name"
          color="primary"
        />
        {errorName ? (
          <TextField
            error
            id="outlined-error-helper-text"
            label="Username"
            helperText='The username must start with a lowercase letter and contain only letters, numbers or special characters "dot" or "underscore" (.or_)'
          />
        ) : (
          <TextField
            required
            id="outlined-required-username"
            label="Username"
            color="primary"
          />
        )}
        <TextField
          required
          id="outlined-required-date"
          color="primary"
          type="date"
          helperText="Please enter you date of birth"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select gender"
          value={gender}
          onChange={handleChange}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required-email"
          label="E-mail"
          color="primary"
          type="email"
        />
        {errorPwd ? (
          <>
            <TextField
              error
              id="outlined-password-input"
              label="Password"
              type="password"
              helperText="Password and confirm password data must be the same"
            />
            <TextField
              error
              id="outlined-confirmPassword-input"
              label="Confirm password"
              type="password"
              helperText="Password and confirm password data must be the same"
            />
          </>
        ) : (
          <>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              color="primary"
            />
            <TextField
              required
              id="outlined-confirmPassword-input"
              label="Confirm password"
              type="password"
              color="primary"
            />
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Registration;
