import React, { useState } from "react";
import "./earnedPoints.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { earnedList, filterEarned, searchEarned } from "../../redux/features/earnedSlice";
import moment from "moment";
import { Button, Tooltip } from "@mui/material";
import { Search } from "@mui/icons-material";

// const initialState = {
//   from: "",
//   to: "",
// };

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EarnedPoints = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { earnedPoints, searchEarnedPoints, loading, error } = useSelector(
    (state) => ({
      ...state.earnedPoint,
    })
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = useQuery();
  const dateFrom = query.get("from");
  const dateTo = query.get("to");

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (from && to) {
    //   dispatch(searchEarned({ from, to }));
    //   navigate(`/pointsEarned/search?from=${from}&to=${to}`);
    //   // setFrom("");
    //   // setTo("");
    // } else {
    //   navigate("/earnedPoints");
    // }


    if (from && to) {
      dispatch(
        filterEarned({
          from: new Date(from).getTime(),
          to: new Date(to).getTime(),
        })
      );
      // navigate(`/exchangePoints/search?from=${from}&to=${to}`);
      // setFrom("");
      // setTo("");
    } else {
      navigate("/earnedpoints");
    }

  };
  useEffect(() => {
    dispatch(searchEarned({ from, to }));
  }, []);

  // useEffect(() => {
  //   dispatch(earnedList());
  // }, []);

  // const [data, setData] = useState(rows);
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "ID Number", width: 100 },
    { field: "email", headerName: "User ID", width: 180 },

    // { field: "reward", headerName: "Reward Number", width: 150 },
    { field: "points", headerName: "Earned Points", width: 130 },
    // {
    //   field: "created_at",
    //   headerName: "Date",
    //   // type: "number",
    //   width: 130,
    // },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        var date = new Date(params.row.start_time);
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
      field: "start_time",
      headerName: "Beginning Time",
      width: 150,
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
    // { field: "end_time", headerName: "Ending Time", width: 130 },
    {
      field: "end_time",
      headerName: "Ending Time",
      width: 150,
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
  ];

  // console.log(from);

  return (
    <div className="earned">
      {/* <div> */}
      <form className="earned-top" onSubmit={handleSubmit}>
        <div>
          From
          <div>
            <input
              type="date"
              style={{ width: "110px", padding: "5px" }}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>
        <div className="earned-name">Earned Points</div>
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
        <Button type="submit" style={{ marginTop: 15 }}>
          <Tooltip title="filter">
            <Search />
          </Tooltip>
        </Button>
      </form>
      {/* </div> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={searchEarnedPoints}
            columns={columns}
            // getRowId={(row) => row.id}
            pageSize={50}
            rowsPerPageOptions={[50]}
          />
        </div>
      )}
    </div>
  );
};

export default EarnedPoints;
