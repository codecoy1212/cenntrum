import React, { useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accumulatedPoints, userList } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";

const AccumulatedPoints = () => {
  const { users, loading, error } = useSelector((state) => ({
    ...state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    if (userId) {
      dispatch(accumulatedPoints(userId));
    }
  }, [userId]);

  const columns = [
    {
      // id: 1,
      // field: "n",
      headerName: "Sr. Number",
      width: 130,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
      // renderCell: (index) => {
      //   // var sr = params.row.n;
      //   // var a = sr * 0;
      //   // var b = a++;
      //   // var n = 0;
      //   var sr = 2 + 1;
      //   // n++;
      //   console.log("hey");
      //   return <>{sr}</>;
      // },
    },
    { field: "id", headerName: "Reward", width: 130 },
    { field: "points", headerName: "Points", width: 130 },
    // { field: "end_time", headerName: "Date", width: 130 },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      renderCell: (params) => {
        var date = new Date(params.row.end_time);
        return (
          <>
            {moment(date).format("DD-MM-YYYY")}
            {/* {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()} */}
          </>
        );
      },
    },
    {
      field: "start_time",
      headerName: "Start",
      width: 130,
      renderCell: (params) => {
        var start = new Date(params.value);
        return (
          <>
            {moment(start).format("LTS")}
            {/* {start.getHours() +
              ":" +
              start.getMinutes() +
              ":" +
              start.getSeconds()} */}
          </>
        );
      },
    },

    {
      field: "end_time",
      headerName: "End",
      width: 160,
      renderCell: (params) => {
        var date = new Date(params.value);
        return (
          <>
            {moment(date).format("LTS")}
            {/* {date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()} */}
          </>
        );
      },
    },
  ];

  return (
    <div className="users">
      <div className="users-heading">Accumulated</div>
      <div>
        <h2>Name :{users.name}</h2>
        <h2>Email :{users.email}</h2>
      </div>
      {/* 1175 */}
      {loading ? (
        <p>loading.....</p>
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={50}
            rowsPerPageOptions={[50]}
            // checkboxSelection
          />
        </div>
      )}
    </div>
  );
};

export default AccumulatedPoints;
