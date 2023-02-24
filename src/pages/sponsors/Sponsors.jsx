import React, { useState } from "react";
import "./sponsors.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";

const Sponsors = () => {
  const rows = [
    {
      id: 1,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 2,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 3,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 4,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 5,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 6,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
    {
      id: 7,
      userId: "xyzzzz@gmail.com",
      name: "xyz",
      birth: "12-2-22",
      phone: "12345678",
    },
  ];

  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID Number", width: 130 },
    { field: "userId", headerName: "User ID", width: 180 },

    { field: "name", headerName: "Name", width: 130 },
    {
      field: "birth",
      headerName: "Birth",
      // type: "number",
      width: 130,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>Lat: 56.7</div>
              <div>Lon: 106.7</div>
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
            <button className='sponsors-list-edit'>Edit</button>
            {/* </Link> */}
            <DeleteOutlineOutlinedIcon
              className='sponsors-list-delete'
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='sponsors'>
      <div className='sponsors-heading'>Sponsors</div>
      <div style={{ height: 400, marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // style={{ width: "fitContent" }}
        />
      </div>
    </div>
  );
};

export default Sponsors;
