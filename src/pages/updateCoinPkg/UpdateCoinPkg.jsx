import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCoinPkg } from "../../redux/features/coinSlice";

const initialState = {
  title: "",
  price: "",
  coins: "",
  // color: null,
};

const UpdateCoinPkg = () => {
  const location = useLocation();
  // const [pkgData, setpkgData] = useState(initialState);
  const [formValue, setFormValue] = useState(initialState);
  const { coinPkg, loading, error } = useSelector((state) => ({
    ...state.coinPkg,
  }));
  const { title, price, coins, color } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = location.pathname.split("/")[2];
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (title && price && coins && color) {
    dispatch(updateCoinPkg({ id, formValue, navigate }));
    // }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // console.log(id);
  return (
    <div className="new-coin">
      <h1>Update Coin Package</h1>
      <form className="add-coin-form" onSubmit={handleSubmit}>
        <div className="add-coin-item">
          <label>Package Type</label>
          <input
            type="text"
            placeholder={coinPkg.title}
            value={title}
            name="title"
            onChange={onInputChange}
          />
        </div>
        {/* <div className="add-coin-item">
          <label>Package Price</label>
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            name="price"
            onChange={onInputChange}
          />
        </div> */}

        <div className="add-coin-item">
          <label>Coins</label>
          <input
            type="text"
            placeholder="Enter Coins"
            value={coins}
            name="coins"
            onChange={onInputChange}
          />
        </div>

        <div className="add-coin-item">
          {/* <label>Choose Color</label>
          <input
            type="color"
            style={{ padding: "2px" }}
            value={color}
            name="color"
            onChange={onInputChange}
          /> */}
        </div>
        <button className="add-coin-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateCoinPkg;
