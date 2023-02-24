import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteBusiness,
  businessList,
} from "../../redux/features/businessSlice";

const BusinessList = () => {

    const { businesses, loading, error } = useSelector((state) => ({
        ...state.business,
      }));
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Business?")) {
          dispatch(deleteBusiness(id));
          window.location.reload();
        }
      };
    
      useEffect(() => {
        dispatch(businessList());
      }, []);
    
      const columns = [
        { field: "id", headerName: "ID Number", width: 100 },
        { field: "name", headerName: "Name", width: 130 },
        // {
        //   field: "img",
        //   headerName: "Image",
        //   width: 80,
        //   // renderCell: (params) => {
        //   //   return (
        //   //     <>
        //   //       <div style={{ display: "flex", flexDirection: "column" }}>
        //   //         <img className="img" src={params.row.img} alt="" />
        //   //       </div>
        //   //     </>
        //   //   );
        //   // },
        // },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "username", headerName: "Username", width: 100 },
        { field: "password", headerName: "Password", width: 200 },
        { field: "description", headerName: "Description", width: 250 },
        // {a
        //   field: "quantity",
        //   headerName: "Quantity",
        //   width: 110,
        // },
        // { field: "req_point", headerName: "Required Points", width: 150 },
        // {
        //   field: "description",
        //   headerName: "Location",
        //   width: 170,
        //   height:340,
        //   renderCell: (params) => {
        //     return (
        //       <>
        //         <div style={{ display: "flex", flexDirection: "column" }}>
        //           <p>{params.row.description}</p>
        //         </div>
        //       </>
        //     );
        //   },
        // },
        // { field: "lat", headerName: "Lat", width: 130 },
        // { field: "lng", headerName: "Lng", width: 130 },
        // { field: "radius", headerName: "Radius", width: 110 },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/BusinessDetail/" + params.row.id}>
                  <button className="incentive-list-edit">Details</button>
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
      <div className="incentive-heading">Business</div>
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
  )
}

export default BusinessList