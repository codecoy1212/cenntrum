import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSetting, updateSetting } from "../../redux/features/settingSlice";
import "./appSetting.css";
import axios from "../../axios";

const initialState = {
  default_coins: "",
  default_time: "",
  business_radius: "",
  earning_poin_time: "",
  earning_point_driving: "",
};
const AppSetting = () => {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/get_setting");
      setSettings(req.data);
      // setInterval(fetchData, 1000);
    }
    fetchData();
  }, []);
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.AppSetting,
  }));
  const {
    default_coins,
    default_time,
    business_radius,
    earning_poin_time,
    earning_point_driving,
  } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (default_coins && default_time) {
    dispatch(updateSetting({ formValue, navigate }));
    // }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // useEffect(() => {
  //   dispatch(getSetting());
  // });

  // console.log(coins);

  return (
    <div className="appSetting">
      <div className="appSetting-top">App Setting</div>
      <div className="appSetting-form-wrapper">
        <form className="appSetting-form" onSubmit={handleSubmit}>
          {/* <div className="appSetting-form-container"> */}
          {/* <div className="appSetting-form-left"> */}
          <div>
            {/* <label>Default Coins</label> */}
            <label>Default Points</label>
            <input
              type="text"
              className="appSetting-input"
              // placeholder={settings?.data?.default_coins}
              defaultValue={settings?.data?.default_coins}
              name="default_coins"
              onChange={onInputChange}
            />
          </div>
          <div>
            {/* <label>Default Time </label> */}
            <label>Default Time (Seg)</label>
            <input
              type="text"
              className="appSetting-input"
              // placeholder="Default Time"
              defaultValue={settings?.data?.default_time}
              name="default_time"
              onChange={onInputChange}
            />
          </div>

          <div>
            {/* <label>Default Radius for Business</label> */}
            <label>
              Default Radius
              <br /> for Business (Km)
            </label>
            <input
              type="text"
              className="appSetting-input2"
              // placeholder="Default Time"
              defaultValue={settings?.data?.business_radius}
              name="business_radius"
              onChange={onInputChange}
            />
          </div>

          <div>
            {/* <label>Max Time for Earning Points</label> */}
            <label>
              Max Time <br />
              for Earning Points (Seg)
            </label>
            <input
              type="text"
              className="appSetting-input2"
              // placeholder="Default Time"
              defaultValue={settings?.data?.earning_poin_time}
              name="earning_poin_time"
              onChange={onInputChange}
            />
          </div>

          <div>
            {/* <label>Max Time for Earning Points For Driving</label> */}
            <label>Max Time for Earning Points for Driving (Seg)</label>
            <input
              type="text"
              className="appSetting-input3"
              // placeholder="Default Time"
              defaultValue={settings?.data?.earning_point_driving}
              name="earning_point_driving"
              onChange={onInputChange}
            />
          </div>

          {/* </div> */}
          {/* </div> */}
          <button className="appSetting-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AppSetting;
