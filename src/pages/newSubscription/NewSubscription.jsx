import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSubsPkg } from "../../redux/features/subscriptionSlice";
import "./newSubscription.css";

const initialState = {
  title: "",
  price: "",
  points: "",
  color: null,
};

const NewSubscription = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.subsPkg,
  }));
  const { title, price, points, color } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && price && points && color) {
      dispatch(createSubsPkg({ formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className='new-subscription'>
      <h1> Add New Subscription</h1>
      <form className='add-subscription-form' onSubmit={handleSubmit}>
        <div className='add-subscription-item'>
          <label>Subscription Type</label>
          <input
            type='text'
            placeholder='Enter Type'
            value={title}
            name='title'
            onChange={onInputChange}
          />
        </div>
        <div className='add-subscription-item'>
          <label>Subscription Price</label>
          <input
            type='text'
            placeholder='Enter Price'
            value={price}
            name='price'
            onChange={onInputChange}
          />
        </div>

        <div className='add-subscription-item'>
          <label>Points</label>
          <input
            type='text'
            placeholder='Enter Points i.e 5'
            value={points}
            name='points'
            onChange={onInputChange}
          />
        </div>

        <div className='add-subscription-item'>
          <label>Choose Color</label>
          <input
            type='color'
            style={{ padding: "2px" }}
            value={color}
            name='color'
            onChange={onInputChange}
          />
        </div>
        <button className='add-subscription-button'>Create</button>
      </form>
    </div>
  );
};

export default NewSubscription;
