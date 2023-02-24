import React, { useEffect } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FileBase from "react-file-base64";
import { updateAdmin } from "../../redux/features/profileSlice";
import axios from "../../axios";

const initialState = {
  username: "",
  password: "",
  dob: "",
  gender: "",
  phone: "",
};

const Profile = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.auth,
  }));

  const [profile, setProfile] = useState([]);
  const { username, password, dob, gender, pic, phone } = formValue;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/get_admin");
      setProfile(req.data);
      // setInterval(fetchData, 1000);
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (username && password && dob && gender && pic && phone) {
    dispatch(updateAdmin({ formValue, navigate }));
    // }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // useEffect(() => {
  //   dispatch(setUser(user));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log(profile);
  return (
    <div className="profile">
      <div className="profile-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-img-container">
            <label htmlFor="file" className="shareOption">
              <img
                className="profile-img"
                src={
                  profile?.data?.pic
                    ? profile?.data?.pic
                    : "data:image/png;base64,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"
                }
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />

              {/* <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg'
              /> */}
              <FileBase
                style={{ display: "none" }}
                type="file"
                multiple={false}
                defaultValue={profile?.data?.pic}
                onDone={({ base64 }) =>
                  setFormValue({ ...formValue, pic: base64 })
                }
              />
            </label>
            {/* <img
              className='profile-img'
              src='https://images.unsplash.com/photo-1659413395193-47851768e24b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
              alt=''
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
            <input type='file' placeholder='Choose Img' /> */}
          </div>
          <div className="form-right">
            <h2 style={{ marginLeft: "30px" }}>Profile Setting</h2>
            <input
              className="profile-input"
              type="email"
              value={profile?.data?.email}
              disabled
            />

            <input
              className="profile-input"
              type="text"
              // placeholder={user?.data?.username}
              defaultValue={profile?.data?.username}
              name="username"
              onChange={onInputChange}
            />
            {/* <input
              className="profile-input"
              type="text"
              placeholder="Last Name"
            /> */}
            <input
              className="profile-input"
              type="text"
              // placeholder={user?.data?.dob}
              defaultValue={profile?.data?.dob}
              name="dob"
              onChange={onInputChange}
            />

            <input
              className="profile-input"
              type="text"
              // placeholder={user?.data?.phone}
              defaultValue={profile?.data?.phone}
              name="phone"
              onChange={onInputChange}
            />

            <input
              className="profile-input"
              type="password"
              placeholder="Password"
              defaultValue="12345678"
              name="password"
              onChange={onInputChange}
            />
            <div>
              <select
                className="profile-input"
                name="gender"
                placeholder="Select gender"
                defaultValue={profile?.data?.gender}
                style={{ width: "inherit" }}
                onChange={onInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button className="profile-button">Update</button>
          </div>
        </form>
      </div>
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
    </div>
  );
};

export default Profile;
