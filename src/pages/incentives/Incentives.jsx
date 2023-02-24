import React, { useState } from "react";
import "./incentives.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteIncentive,
  incentiveList,
} from "../../redux/features/incentiveSlice";

const Incentives = () => {
  const { incentives, loading, error } = useSelector((state) => ({
    ...state.incentive,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Incentive?")) {
      dispatch(deleteIncentive(id));
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(incentiveList());
  }, []);

  const columns = [
    { field: "id", headerName: "ID Number", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "img",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img className="img" src={params.row.img} alt="" />
            </div>
          </>
        );
      },
    },
    // { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 100 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 110,
    },
    { field: "req_point", headerName: "Required Points", width: 150 },
    // {
    //   field: "location",
    //   headerName: "Location",
    //   width: 170,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div style={{ display: "flex", flexDirection: "column" }}>
    //           <div>Lat: 56.7</div>
    //           <div>Lon: 106.7</div>
    //         </div>
    //       </>
    //     );
    //   },
    // },
    { field: "lat", headerName: "Lat", width: 130 },
    { field: "lng", headerName: "Lng", width: 130 },
    { field: "radius", headerName: "Radius", width: 110 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/updateIncentive/" + params.row.id}>
              <button className="incentive-list-edit">Edit</button>
            </Link>
            <DeleteOutlineOutlinedIcon
              className="incentive-list-delete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="incentive">
      <div className="incentive-heading">Incentives</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ height: 400, marginTop: "20px" }}>
          <DataGrid
            rows={incentives}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
            // style={{ width: "fitContent" }}
          />
        </div>
      )}
    </div>
  );
};

export default Incentives;
