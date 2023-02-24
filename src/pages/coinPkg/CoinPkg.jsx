import React, { useEffect, useState } from "react";
import "./coinPkg.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coinPkgList, deleteCoinPkg } from "../../redux/features/coinSlice";

const CoinPkg = () => {
  const { coinPkgs, loading, error } = useSelector((state) => ({
    ...state.coinPkg,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(coinPkgList());
  }, []);
  console.log(coinPkgs);

  // const [data, setData] = useState(rows);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pkg?")) {
      dispatch(deleteCoinPkg(id));
    }
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "coins", headerName: "Coins", width: 180 },

    { field: "title", headerName: "Type", width: 130 },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/updateCoinPackage/" + params.row.id}>
              <button className="coin-list-edit">Edit</button>
            </Link>
            <DeleteOutlineOutlinedIcon
              className="coin-list-delete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="coin">
      <div className="coin-heading">Coin Packages</div>
      {/* <div style={{ width: "150px" }}>
        <Link to="/addNewcoinPackage">
          <div className="coin-add">Add New Package</div>
        </Link>
      </div> */}
      {/* 720 */}
      <div style={{ height: 267, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={coinPkgs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default CoinPkg;
