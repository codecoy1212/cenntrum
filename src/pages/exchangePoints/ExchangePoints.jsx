import React, { useEffect, useState } from "react";
import "./exchangePoints.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import {
  exchangeList,
  searchExchange,
} from "../../redux/features/exchangeSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ExchangePoints = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { exchangePoints, searchExchangePoints, loading, error } = useSelector(
    (state) => ({
      ...state.exchangePoint,
    })
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(exchangeList());
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      dispatch(searchExchange({ from, to }));
      navigate(`/exchangePoints/search?from=${from}&to=${to}`);
      // setFrom("");
      // setTo("");
    } else {
      navigate("/exchangedPoints");
    }
  };
  useEffect(() => {
    dispatch(searchExchange({ from, to }));
  }, [from, to]);

  // const [data, setData] = useState(rows);
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "ID Number", width: 100 },
    { field: "email", headerName: "User ID", width: 180 },

    // { field: "exchangeNumber", headerName: "Exchange Number", width: 160 },
    { field: "points", headerName: "Exchanged Points", width: 160 },
    {
      field: "date",
      headerName: "Date",
      // type: "number",
      width: 130,
      renderCell: (params) => {
        var date = new Date(params.row.date_time);
        // console.log(params);
        return (
          <>
            {moment(date).format("DD-MM-YYYY")}
            {/* {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()} */}
          </>
        );
      },
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
              "." +
              date.getMinutes() +
              "." +
              date.getSeconds()} */}
          </>
        );
      },
    },
    {
      field: "inc_name",
      headerName: "Incentives",
      width: 190,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {/* <Link to={"/user/" + params.row.id}> */}
    //         <button className="earned-list-edit">Edit</button>
    //         {/* </Link> */}
    //         <DeleteOutlineOutlinedIcon
    //           className="earned-list-delete"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  // console.log();

  return (
    <div className="exchange">
      {/* <div className="exchange-top"> */}
      <form className="exchange-top" onSubmit={handleSubmit}>
        <div>
          From
          <div>
            <input
              id="test"
              type="date"
              style={{ width: "110px", padding: "5px" }}
              // onChange={(e) => alert(e.target.value)}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>
        <div className="exchange-name">Exchanged Points</div>
        <div>
          To
          <div>
            <input
              type="date"
              style={{ width: "110px", padding: "5px" }}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* </div> */}
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={searchExchangePoints}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
          />
        </div>
      )}
    </div>
  );
};

export default ExchangePoints;
