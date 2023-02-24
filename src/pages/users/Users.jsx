import React, { useState } from "react";
import "./users.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, userList } from "../../redux/features/userSlice";
import { useEffect } from "react";
import axios from "../../axios";
import moment from "moment";

const Users = () => {
  const { users, loading, error } = useSelector((state) => ({
    ...state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const req = await axios.post("/web_users_list");
  //     setUsers(req.data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    dispatch(userList());
  }, []);
  // console.log(users);

  // const rows = [
  //   {
  //     id: 1,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 3,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 4,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 5,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 6,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 7,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  //   {
  //     id: 8,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     birth: "12-2-22",
  //     gender: "male",
  //     phone: "12345678",
  //     userId: "xyzzzz@gmail.com",
  //   },
  // ];

  // const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pkg?")) {
      dispatch(deleteUser(id));
      window.location.reload();
    }
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID Number", width: 130 },
    { field: "firstname", headerName: "F. Name", width: 130 },
    { field: "lastname", headerName: "L. Name", width: 130 },
    {
      field: "dob",
      headerName: "Birth",
      // type: "number",
      width: 130,
      renderCell: (params) => {
        var date = new Date(params.value);
        return (
          <>
            {moment(date).format("DD-MM-YYYY")}
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
      field: "gender",
      headerName: "Gender",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    { field: "phone", headerName: "Phone", width: 160 },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "total_points",
      headerName: "Accumulated Points",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "180px",
                justifyContent: "space-between",
              }}
            >
              {/* <div> */}
              <p>{params.row.total_points}</p>
              {/* </div>
              <div> */}
              <Link to={"/accumulatedPoints/" + params.row.id}>
                <button className="users-list-view">View</button>
              </Link>
              {/* </div> */}
            </div>
          </>
        );
      },
    },
    {
      field: "exchange_points",
      headerName: "Exchange Points",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "180px",
                justifyContent: "space-between",
              }}
            >
              <p>{params.row.exchange_points}</p>
              <Link to={"/userExchangePoints/" + params.row.id}>
                <button className="users-list-view">View</button>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "Rewards",
      headerName: "Rewards",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "180px",
                justifyContent: "space-between",
              }}
            >
              <Link to={"/userRewards/" + params.row.id}>
                <button className="users-list-view">View</button>
              </Link>
            </div>
          </>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user/" + params.row.id}> */}
            {/* <button className="users-list-view">View</button> */}
            {/* </Link> */}
            <button
              className="users-list-action"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
              <DeleteOutlineOutlinedIcon
                className="users-list-delete"
                // onClick={() => handleDelete(params.row.id)}
              />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="users">
      <div className="users-heading">Users</div>
      {/* 1175 */}
      {loading ? (
        <p>loading......</p>
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

export default Users;
