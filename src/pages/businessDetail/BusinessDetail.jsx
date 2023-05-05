import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteBusiness,
  businessDetail,
} from "../../redux/features/businessSlice";
import { deleteIncentive } from "../../redux/features/incentiveSlice";
const BusinessDetail = () => {
  const { businesses, loading, error } = useSelector((state) => ({
    ...state.business,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Business?")) {
      dispatch(deleteIncentive(id));
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(businessDetail(userId));
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

    { field: "req_point", headerName: "Required Points", width: 150 },
    { field: "cardcode", headerName: "Pre Code", width: 150 },
    { field: "value", headerName: "Minimim Purchase", width: 150 },
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
    // { field: "lat", headerName: "Lat", width: 130 },
    // { field: "lng", headerName: "Lng", width: 130 },
    // { field: "radius", headerName: "Radius", width: 110 },
    {
      field: "dateTime",
      headerName: "Date & Time",
      width: 250,
      renderCell: (params) => {
        return <>{params.row.dateTime}</>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },

    {
      field: "used",
      headerName: "Remaining Quantity",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/updateIncentive/" + params.row.id}
              state={{ data: params.row }}
            >
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
    //       {
    //           field: "status",
    //           headerName: "Status",
    //           width: 150,
    //           renderCell: (params) => {
    //             return (
    //               <>

    // {params.row.type==1 &&  params.row.used==1? (
    //         <span>Redeemed</span>
    //       ):'' }
    //       {params.row.type==1 && params.row.used==0 &&  params.row.firstname? (
    //         <span>Not Redeemed</span>
    //       ):'' }
    //       {params.row.type==1 && params.row.used==0 &&  params.row.firstname==null? (
    //         <span>Available</span>
    //       ):'' }

    //               </>
    //             );
    //           },
    //         },
  ];

  return (
    <div className="incentive">
      <div className="incentive-heading">Business Detail</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ height: 400, marginTop: "20px" }}>
          <DataGrid
            rows={businesses}
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

export default BusinessDetail;
