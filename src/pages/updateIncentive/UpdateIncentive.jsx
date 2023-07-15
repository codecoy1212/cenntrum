import React, { useEffect, useState } from "react";
// import "./updateIncentive.css";
import GoogleMapReact from "google-map-react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createIncentive,
  updateIncentive,
} from "../../redux/features/incentiveSlice";
import FileBase from "react-file-base64";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { IMAGE_BASE_URL } from "../../redux/api";

const style = { display: "flex", flexDirection: "column", padding: 10 };

export const UpdateIncentive = (props) => {
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  const initialState = {
    img: data?.img ?? "",
    name: data?.name ?? "",
    value: data?.value,
    quantity: data?.quantity,
    req_point: data?.req_point,
    laat: data?.lat ?? "",
    lang: data?.lng ?? "",
    radius: data?.radius,
    cardcode: data?.cardcode,
    expiry_date: data?.expiry_date,
  };
  const initialMapState = {
    address: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    lat: 31.4689545,
    lng: 74.26450799999999,
    mapCenter: "",
  };

  const [state, setState] = useState(initialMapState);
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.incentive,
  }));

  const {
    name,
    value,
    quantity,
    req_point,
    laat,
    lang,
    radius,
    img,
    cardcode,
    expiry_date,
  } = formValue;

  const {
    address,
    showingInfoWindow,
    activeMarker,
    selectedPlace,
    // laat,
    // lang,
    mapCenter,
  } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && value && quantity && req_point) {
      dispatch(updateIncentive({ id, formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const uploadImage = (e) => {
    let { name, files } = e.target;
    console.log(files[0]);
    setState({ ...state, img: files[0] });
    setFormValue({ ...formValue, img: e.target.files[0] });
  };

  const handleChange = (address) => {
    setState({ address });
  };

  // const google = window.location;

  const handleSelect = (address) => {
    setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);

        // update center state
        setFormValue({ ...formValue, laat: latLng.lat, lang: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
  };

  console.log(laat, lang);

  return (
    <div className="incentive">
      <div className="incentive-top">Update Incentive</div>
      <div className="incentive-form-wrapper">
        <form className="incentive-form" onSubmit={handleSubmit}>
          <div className="incentive-form-container">
            <div className="incentive-form-left">
              <div>
                <div style={style}>
                  <label>Name</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Incentive Name"
                    value={name}
                    name="name"
                    onChange={onInputChange}
                  />
                </div>
                {data?.type === 1 && (
                  <>
                    <div style={style}>
                      <label>Gift Card Pre Code</label>
                      <input
                        className="incentive-input"
                        value={cardcode}
                        name="cardcode"
                        placeholder="GiftCode-"
                        disabled
                      />
                    </div>

                    <div style={style}>
                      <label>Minimum Purchase to Avail Discount</label>
                      <input
                        className="incentive-input"
                        type="number"
                        value={value}
                        name="value"
                        onChange={onInputChange}
                      />
                    </div>
                  </>
                )}
                {/* <input
                  type="text"
                  className="incentive-input"
                  placeholder="Enter Incentive value"
                  value={value}
                  name="value"
                  onChange={onInputChange}
                /> */}
                {data?.type == 2 && (
                  <div>
                    <label>Quantity Of Incentive</label>
                    <input
                      type="number"
                      className="incentive-input"
                      placeholder="Enter Quantity Of Incentive"
                      value={value}
                      name="value"
                      onChange={onInputChange}
                    />
                  </div>
                )}
                <div style={style}>
                  <label>Value Of Incentive</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Value Of Incentive"
                    value={quantity}
                    name="quantity"
                    onChange={onInputChange}
                  />
                </div>
                <div style={style}>
                  <label>Required Points</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Required Points"
                    value={req_point}
                    name="req_point"
                    onChange={onInputChange}
                  />
                </div>
                {data?.type === 1 && (
                  <div>
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      className="incentive-input"
                      placeholder="Enter Expiry Date"
                      value={expiry_date}
                      name="expiry_date"
                      onChange={onInputChange}
                    />
                  </div>
                )}
              </div>

              {data?.type === 2 && (
                <div style={style}>
                  <label>Max Distance</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Max. Distance to show incentive"
                    value={radius}
                    name="radius"
                    onChange={onInputChange}
                  />
                </div>
              )}

              <div style={{ margin: "10px 35px" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {/* <PermMediaIcon
                    htmlColor="tomato"
                    style={{ marginRight: "5px" }}
                  /> */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <img
                      className="img"
                      src={
                        state.img
                          ? URL.createObjectURL(state.img)
                          : IMAGE_BASE_URL + img
                      }
                      alt=""
                    />
                  </div>
                  {/* <span>Choose Image</span> */}
                  {/* <input
                    style={{ display: "none" }}
                    type='file'
                    id='file'
                    accept='.png,.jpeg,.jpg'
                    value={img}
                    name='img'
                    onChange={onInputChange}
                  /> */}
                  {/* <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormValue({ ...formValue, img: base64 })
                    }
                  /> */}

                  <input
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    name="img"
                    onChange={uploadImage}
                  />
                </label>
              </div>
            </div>

            {data?.type === 2 && (
              <div className="incentive-form-right">
                <div>
                  <h3>Sponsor Location</h3>
                  <div
                    style={{
                      width: "100% !important",
                      height: "100vh !important",
                    }}
                  >
                    {/* <Map value={props.latLng} onChange={onInputChange} /> */}
                    <div
                      id="googleMaps"
                      style={{ width: "50vh", height: "50vh" }}
                    >
                      <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              className="map-input"
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                // className: "location-search-input",
                                className: "map-input",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer",
                                      // padding: "10px",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                      // padding: "10px",
                                      margin: "10px",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>

                      <Map
                        google={props.google}
                        initialCenter={{
                          lat: laat,
                          lng: lang,
                        }}
                        center={{
                          // mapCenter.lat
                          // ()
                          lat: laat,
                          lng: lang,
                        }}
                        zoom={14}
                        containerStyle={{ height: "50vh", width: "inherit" }}
                      >
                        <Marker
                          position={{
                            lat: laat,
                            lng: lang,
                          }}
                          // draggable={{
                          //   lat: laat,
                          //   lng: lang,
                          // }}
                        />
                      </Map>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="incentive-form-bottom">
            {/* <button className="incentive-button">Create</button> */}
            <button className="incentive-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyDhAq5JksRnXEQwwxCXGNtJpZ_HAPC-XsM",
})(UpdateIncentive);
// export default UpdateIncentive
