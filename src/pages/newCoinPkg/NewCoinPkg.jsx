import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCoinPkg } from "../../redux/features/coinSlice";
import "./newCoinPkg.css";

const initialState = {
  title: "",
  price: "",
  coins: "",
  color: null,
};

const NewCoinPkg = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.coinPkg }));
  const { title, price, coins, color } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && price && coins && color) {
      dispatch(createCoinPkg({ formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className='new-coin'>
      <h1> Add New Coin Package</h1>
      <form className='add-coin-form' onSubmit={handleSubmit}>
        <div className='add-coin-item'>
          <label>Package Type</label>
          <input
            type='text'
            placeholder='Enter Type'
            value={title}
            name='title'
            onChange={onInputChange}
          />
        </div>
        <div className='add-coin-item'>
          <label>Package Price</label>
          <input
            type='text'
            placeholder='Enter Price'
            value={price}
            name='price'
            onChange={onInputChange}
          />
        </div>

        <div className='add-coin-item'>
          <label>Coins</label>
          <input
            type='text'
            placeholder='Enter Coins'
            value={coins}
            name='coins'
            onChange={onInputChange}
          />
        </div>

        <div className='add-coin-item'>
          <label>Choose Color</label>
          <input
            type='color'
            style={{ padding: "2px" }}
            value={color}
            name='color'
            onChange={onInputChange}
          />
        </div>
        <button className='add-coin-button'>Create</button>
      </form>
    </div>
  );
};

export default NewCoinPkg;
