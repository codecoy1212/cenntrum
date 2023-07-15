import React, { useState } from "react";
import "./sendCrypto.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sendCrypto } from "../../redux/features/cryptoSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

const SendCrypto = () => {
  const location = useLocation();
  const row = location.state?.row;

  const initialState = {
    exchange_id: row?.id ?? "",
    type: "2",
    crypto_name: row?.inc_name ?? "",
    email: row?.email ?? "",
    quantity_to_be_sent: row?.crpto_quantity ?? "",
    exchange: row?.points ?? "",
    points: row?.points ?? "",
    date_of_exchange_: row?.date_time
      ? moment(row.date_time).format("DD-MM-YYYY")
      : "",
    time_of_exchange: row?.date_time ? moment(row.date_time).format("LTS") : "",
    subject: "",
    wallet_address: row?.address ?? "",
    desc: "",
  };

  const [formValue, setFormValue] = useState(initialState);

  const { loading, error } = useSelector((state) => ({
    ...state.crypto,
  }));
  const {
    email,
    crypto_name,
    quantity_to_be_sent,
    exchange,
    points,
    date_of_exchange_,
    time_of_exchange,
    subject,
    wallet_address,
    desc,
  } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    if (email && exchange && points && date_of_exchange_) {
      dispatch(sendCrypto({ formValue, navigate }));
    }
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
      <div
        className="crypto-form-wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form className="crypto-form" onSubmit={handleSubmit}>
          <div className="crypto-form-container">
            <div className="crypto-form-lef">
              <div>
                <label>User Email</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="User Email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label>Cypto Name</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="Crypto Name"
                  value={crypto_name}
                  name="crypto_name"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label>Value Of Incentive</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="Value Of Incentive"
                  value={quantity_to_be_sent}
                  name="quantity_to_be_sent"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label>Exchanged Points</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="Exchanged Points"
                  value={points}
                  name="points"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label>Date Of Exchange</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="Date Of Exchange"
                  value={date_of_exchange_}
                  name="date_of_exchange_"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label>Time Of Exchange</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="Time Of Exchange"
                  value={time_of_exchange}
                  name="time_of_exchange"
                  onChange={onInputChange}
                />
              </div>
              {/* <input
                type="text"
                className="crypto-input"
                placeholder="Subject"
                value={subject}
                name="subject"
                onChange={onInputChange}
              /> */}
              <div>
                <label>User Wallet Address</label>
                <input
                  type="text"
                  className="crypto-input"
                  placeholder="User Wallet Address"
                  value={wallet_address}
                  name="wallet_address"
                  onChange={onInputChange}
                />
              </div>

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
            {/* <div className="crypto-form-right">
              <div>
                <ReactQuill
                  theme="snow"
                  value={desc}
                  onChange={setDesc}
                  // style={{ minHeight: "100px" }}
                />
              </div>
            </div> */}
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
