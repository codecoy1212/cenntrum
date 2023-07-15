import React, { useEffect, useState } from "react";
import "./exchangePoints.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import {
  exchangeList,
  searchExchange,
  filterExchange,
} from "../../redux/features/exchangeSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";

const ExchangePoints = () => {
  const [from, setFrom] = useState("2023-01-01");
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState(2);

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

  const filter = (event, value) => {
    setType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (from && to) {
      dispatch(
        filterExchange({
          from: new Date(from).getTime(),
          to: new Date(to).getTime(),
          type,
        })
      );
      // navigate(`/exchangePoints/search?from=${from}&to=${to}`);
      // setFrom("");
      // setTo("");
    } else {
      navigate("/exchangedPoints");
    }
  };
  useEffect(() => {
    dispatch(searchExchange({ from, to, type }));
  }, [type]);

  // const [data, setData] = useState(rows);
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const cryptoColumns = [
    { field: "id", headerName: "Exchanged ID", width: 130 },
    { field: "email", headerName: "Email", width: 180 },

    // { field: "exchangeNumber", headerName: "Exchange Number", width: 160 },
    { field: "points", headerName: "Exchanged Points", width: 160 },
    { field: "crpto_quantity", headerName: "Value Of Incentive", width: 160 },
    {
      field: "date_time",
      headerName: "Exchanged Date",
      // type: "number",
      width: 150,
      renderCell: (params) => {
        var date = new Date(params.row.date_time);

        return (
          <>
            {moment(date).format("DD-MM-YYYY")}
            {/* {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()} */}
          </>
        );
      },
    },
    {
      field: "time",
      headerName: "Exchanged Time",
      width: 150,
      renderCell: (params) => {
        var date = new Date(params.row.date_time);
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
      headerName: "Incentive Name",
      width: 190,
    },
    {
      field: "buying_status",
      headerName: "Status",
      width: 190,
      renderCell: (params) => {
        return <>{params.row.buying_status === 0 ? "pending" : "sent"}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          params.row.buying_status === 0 && (
            <Link
              to="/sendCrypto"
              state={{ row: params.row }}
              className="coin-list-edit"
            >
              Send
            </Link>
          )
        );
      },
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

  const giftColumns = [
    { field: "id", headerName: "Exchanged ID", width: 130 },
    { field: "email", headerName: "Email", width: 180 },

    {
      field: "redeemed_date",
      headerName: "Exchanged Date",
      width: 150,
      renderCell: (params) => {
        var date = new Date(params.row.redeemed_date);
        return <>{moment(date).format("DD-MM-YYYY")}</>;
      },
    },
    {
      field: "time",
      headerName: "Exchanged Time",
      width: 150,
      renderCell: (params) => {
        var date = new Date(params.row.redeemed_date);
        return <>{moment(date).format("LTS")}</>;
      },
    },
    {
      field: "inc_name",
      headerName: "Incentive Name",
      width: 190,
    },
    {
      field: "giftcode",
      headerName: "Gift Code",
      width: 190,
    },
    {
      field: "name",
      headerName: "Business Name",
      width: 190,
    },
  ];

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
        <Button type="submit" style={{ marginTop: 15 }}>
          <Tooltip title="filter">
            <Search />
          </Tooltip>
        </Button>
      </form>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={filter}
          value={type}
        >
          <FormControlLabel value={1} control={<Radio />} label="gift" />
          <FormControlLabel value={2} control={<Radio />} label="crypto" />
        </RadioGroup>
      </FormControl>
      {/* </div> */}
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={searchExchangePoints}
            columns={type == 1 ? giftColumns : cryptoColumns}
            pageSize={50}
            rowsPerPageOptions={[50]}
          />
        </div>
      )}
    </div>
  );
};

export default ExchangePoints;
