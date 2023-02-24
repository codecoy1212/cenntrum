import React from "react";
import "./register.css";
import bg from "../../img/bg.png";
import logo from "../../img/logo.png";

const Register = () => {
  return (
    <div className='register'>
      <img className='register-left' src={bg} alt='svg' />

      <div className='register-right'>
        <img src={logo} alt='' style={{ height: "170px" }} />
        <div className='register-wrapper'>
          <div className='register-container'>
            <h2 style={{ marginLeft: "35px" }}>Register</h2>
          </div>

          <form>
            <div className='register-form'>
              <input
                className='register-input'
                type='text'
                placeholder='Enter First Name'
              />
              <input
                className='register-input'
                type='text'
                placeholder='Enter Last Name'
              />
              <input
                className='register-input'
                type='email'
                placeholder='Enter Email'
              />
              <input
                className='register-input'
                type='text'
                placeholder='Enter Date of Birth'
              />
              <input
                className='register-input'
                type='text'
                placeholder='Enter Phone Number'
              />
              <input
                className='register-input'
                type='password'
                placeholder='Enter Password'
              />
              <div>
                <select
                  className='register-input'
                  name='gender'
                  placeholder='Select gender'
                  style={{ width: "inherit" }}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
            <div>
              <button className='register-button'>Register</button>
            </div>
          </form>
          <div style={{ marginLeft: "35px", marginTop: "10px" }}>
            Already have an account?
            <span style={{ color: "#155958", fontWeight: "500" }}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
