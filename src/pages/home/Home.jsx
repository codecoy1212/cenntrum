import React, { useEffect } from "react";
import "./home.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='home'>
      <div>
        <p className='home-animation'>Welcome</p>
      </div>
      <div>
        <img
          className='home-img'
          src={
            user?.data?.pic
              ? user?.data?.pic
              : "data:image/png;base64,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"
          }
          alt=''
        />
      </div>
      <div>
        <h2>{user?.data?.username}</h2>
      </div>
    </div>
  );
};

export default Home;
