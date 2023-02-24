import React, { useEffect, useState } from "react";
import "./subscription.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubsPkg,
  subsPkgList,
} from "../../redux/features/subscriptionSlice";

const Subscription = () => {
  const { subsPkgs, loading, error } = useSelector((state) => ({
    ...state.subsPkg,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(subsPkgList());
  }, []);

  // const rows = [
  //   {
  //     id: 1,
  //     points: "2X",
  //     type: "Silver",
  //     price: "$ 50",
  //   },
  //   {
  //     id: 2,
  //     points: "5X",
  //     type: "Gold",
  //     price: "$ 150",
  //   },
  //   {
  //     id: 3,
  //     points: "10X",
  //     type: "Diamond",
  //     price: "$ 250",
  //   },
  // ];

  // const [data, setData] = useState(rows);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pkg?")) {
      dispatch(deleteSubsPkg(id));
    }
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "points", headerName: "Points", width: 180 },

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
            <Link to={"/updateSubscription/" + params.row.id}>
              <button className="subscription-list-edit">Edit</button>
            </Link>
            <DeleteOutlineOutlinedIcon
              className="subscription-list-delete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="subscription">
      <div className="subscription-heading">Subscriptions</div>
      {/* <div style={{ width: "150px" }}>
        <Link to='/addNewSubscription'>
          <div className='subscription-add'>Add New Subscription</div>
        </Link>
      </div> */}

      <div style={{ height: 215, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={subsPkgs}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default Subscription;
