import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSubsPkg } from "../../redux/features/subscriptionSlice";

const initialState = {
  title: "",
  // price: "",
  points: "",
  // color: null,
};
const UpdateSubscription = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.subsPkg,
  }));
  const { title, price, points, color } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (title && price && points && color) {
    dispatch(updateSubsPkg({ id, formValue, navigate }));
    // }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="new-subscription">
      <h1>Update Subscription</h1>
      <form className="add-subscription-form" onSubmit={handleSubmit}>
        <div className="add-subscription-item">
          <label>Subscription Type</label>
          <input
            type="text"
            placeholder="Enter Type"
            value={title}
            name="title"
            onChange={onInputChange}
          />
        </div>
        {/* <div className='add-subscription-item'>
          <label>Subscription Price</label>
          <input
            type='text'
            placeholder='Enter Price'
            value={price}
            name='price'
            onChange={onInputChange}
          />
        </div> */}

        <div className="add-subscription-item">
          <label>Points</label>
          <input
            type="text"
            placeholder="Enter Points i.e 5"
            value={points}
            name="points"
            onChange={onInputChange}
          />
        </div>

        {/* <div className='add-subscription-item'>
          <label>Choose Color</label>
          <input
            type='color'
            style={{ padding: "2px" }}
            value={color}
            name='color'
            onChange={onInputChange}
          />
        </div> */}
        <button className="add-subscription-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateSubscription;
