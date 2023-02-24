import React, { useState } from "react";
import "./sendCrypto.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCrypto } from "../../redux/features/cryptoSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialState = {
  type: "2",
  email: "",
  exchange: "",
  points: "",
  date: "",
  subject: "",
  wallet: "",
  desc: "",
};

const SendCrypto = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { loading, error } = useSelector((state) => ({
    ...state.crypto,
  }));
  const { email, exchange, points, date, subject, wallet, desc } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (email && exchange && points && date && subject && desc) {
    dispatch(sendCrypto({ formValue, navigate }));
    // }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const setDesc = (value) => {
    setFormValue({ ...formValue, desc: value });
  };

  return (
    <div className="crypto">
      <div className="crypto-top">Send Crypto Assets</div>
      <div className="crypto-form-wrapper">
        <form className="crypto-form" onSubmit={handleSubmit}>
          <div className="crypto-form-container">
            <div className="crypto-form-left">
              <input
                type="text"
                className="crypto-input"
                placeholder="User Email"
                value={email}
                name="email"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="crypto-input"
                placeholder="Exchange N°"
                value={exchange}
                name="exchange"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="crypto-input"
                placeholder="Points"
                value={points}
                name="points"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="crypto-input"
                placeholder="Date and Time"
                value={date}
                name="date"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="crypto-input"
                placeholder="Subject"
                value={subject}
                name="subject"
                onChange={onInputChange}
              />

              <input
                type="text"
                className="crypto-input"
                placeholder="Wallet Address"
                value={wallet}
                name="wallet"
                onChange={onInputChange}
              />

              {/* <div style={{ margin: "10px 35px" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                ></label>
              </div> */}
            </div>
            <div className="crypto-form-right">
              <div>
                <ReactQuill
                  theme="snow"
                  value={desc}
                  onChange={setDesc}
                  // style={{ minHeight: "100px" }}
                />
              </div>
            </div>
          </div>
          <button className="crypto-button">Send</button>
        </form>
      </div>
    </div>

    // <div className='crypto'>
    //   <div className='crypto-top'>Send Crypto Assets</div>
    //   <div className='crypto-form-wrapper'>
    //     <form className='crypto-form'>
    //       <div className='crypto-form-container'>
    //         <div className='crypto-form-left'>
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Enter User ID'
    //           />
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Enter Points'
    //           />
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Enter Date and Time'
    //           />
    //         </div>
    //         <div className='crypto-form-right'>
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Exchange N*'
    //           />
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Enter Subject'
    //           />
    //           <input
    //             type='text'
    //             className='crypto-input'
    //             placeholder='Wallet Address'
    //           />
    //         </div>
    //       </div>
    //       <button className='crypto-button'>Send</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default SendCrypto;
