import React, { useEffect, useState } from "react";
import "./login.css";
import bg from "../../img/bg.png";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="login">
      <img className="login-left" src={bg} alt="" />
      <div className="login-right">
        <img src={logo} alt="" style={{ height: "170px", margin: "50px 0" }} />
        <div className="login-wrapper">
          <div className="login-container">
            <h2>Login</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              value={email}
              name="email"
              onChange={onInputChange}
              placeholder="Enter Email"
            />
            <input
              className="login-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={onInputChange}
            />
            <button className="login-button">
              {loading && (
                <CircularProgress
                  style={{ height: "5px !important", width: "20px" }}
                />
              )}
              Login
            </button>
          </form>
          {/* <div style={{ marginTop: "10px" }}>
            Already have an account?
            <span style={{ color: "#155958", fontWeight: "500" }}>
              Register
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
