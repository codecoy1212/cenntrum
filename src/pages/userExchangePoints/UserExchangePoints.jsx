import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { points, userList } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const UserExchangePoints = () => {
  const { users, loading, error } = useSelector((state) => ({
    ...state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    if (userId) {
      dispatch(points(userId));
    }
  }, [userId]);

  const columns = [
    {
      headerName: "Sr. Number",
      width: 130,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    { field: "id", headerName: "Exchanged", width: 130 },
    {
      field: "points",
      headerName: "Points",
      width: 160,
    },
    {
      field: "date_time",
      headerName: "Time",
      width: 130,
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
    {
      field: "date",
      headerName: "Date",
      width: 130,
      renderCell: (params) => {
        var date = new Date(params.row.date_time);
        console.log(params);
        return (
          <>
            {moment(date).format("DD-MM-YYYY")}
            {/* {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()} */}
          </>
        );
      },
    },
  ];
  return (
    <div className="users">
      <div className="users-heading">Exchanged</div>
      <div>
        <h2>Name :{users.name}</h2>
        <h2>Email :{users.email}</h2>
      </div>
      {/* 1175 */}
      {loading ? (
        <p>loading...</p>
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

export default UserExchangePoints;
