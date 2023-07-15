import React from "react";
import GoogleMapReact from "google-map-react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBusiness,
  updateBusiness,
} from "../../redux/features/businessSlice";
import FileBase from "react-file-base64";
import "./createBusiness.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "../../axios";

import { useEffect, useState } from "react";

const initialMapState = {
  address: "",
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  // mapCenter: {
  //   lat: 49.2827291,
  //   lng: -102.1207375,
  // },
  lat: 31.4689545,
  lng: 74.26450799,
  mapCenter: "",
  divStatus: 1,
};

export const CreateBusiness = (props) => {
  const location = useLocation();
  const row = location.state?.row;

  const initialState = {
    business_id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    username: row.username,
    description: row.description,
    password: row.password,
    laat: row?.laat,
    lang: row?.lang,
    locationStatus: row?.laat ? true : false,
    status: row.status,
  };

  const [state, setState] = useState(initialMapState);
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.business,
  }));

  const {
    name,
    phone,
    email,
    username,
    password,
    laat,
    lang,
    description,
    locationStatus,
    status,
  } = formValue;

  const {
    address,
    showingInfoWindow,
    activeMarker,
    selectedPlace,
    // laat,
    // lang,
    mapCenter,
    divStatus,
  } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && username && password) {
      dispatch(updateBusiness({ formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    if (name == "status") {
      setFormValue({ ...formValue, [name]: e.target.checked ? 1 : 0 });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  const onInputChange2 = (e) => {
    let { name, value } = e.target;
    setState({ divStatus: value });
    setFormValue({ ...formValue, [name]: value });
    console.log(value);
  };

  const onInputChange3 = (e) => {
    let { name, checked } = e.target;
    setFormValue({ ...formValue, [name]: checked });
    console.log(checked);
  };

  const handleChange = (address) => {
    setState({ address });
  };
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
  // const google = window.location;

  //   const handleSelect = (address) => {
  //     setState({ address });
  //     geocodeByAddress(address)
  //       .then((results) => getLatLng(results[0]))
  //       .then((latLng) => {
  //         console.log("Success", latLng);

  //         // update center state
  //         setFormValue({ ...formValue, laat: latLng.lat, lang: latLng.lng });
  //       })
  //       .catch((error) => console.error("Error", error));
  //   };

  return (
    <div className="incentive">
      <div className="incentive-top">Update Business</div>
      <div className="incentive-form-wrapper">
        <form className="incentive-form" onSubmit={handleSubmit}>
          <div className="incentive-form-container">
            <div className="incentive-form-left">
              <div>
                <div>
                  <label>Business Name</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Business Name"
                    value={name}
                    name="name"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Username"
                    value={username}
                    name="username"
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    disabled
                    className="incentive-input"
                    placeholder="Enter Email"
                    value={email}
                    name="email"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Password"
                    value={password}
                    name="password"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Phone"
                    value={phone}
                    name="phone"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <label>Business Description</label>
                  <textarea
                    className="incentive-input"
                    value={description}
                    name="description"
                    onChange={onInputChange}
                  ></textarea>
                </div>

                <div>
                  <label>Set As Global</label>
                  &nbsp;&nbsp;
                  <input
                    type="checkbox"
                    className=""
                    defaultChecked={status ? true : false}
                    value={status}
                    name="status"
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="incentive-form-right">
              <h3 className="flex">
                Business Location{" "}
                <input
                  type="checkbox"
                  className="incentive-input"
                  placeholder="Max. Distance"
                  checked={locationStatus}
                  name="locationStatus"
                  onChange={onInputChange3}
                />
              </h3>

              {locationStatus && (
                <div>
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
                        containerStyle={{ height: "58vh", width: "inherit" }}
                      >
                        <Marker
                          position={{
                            lat: laat,
                            lng: lang,
                          }}
                          draggable
                          // onChange={handleSelect}

                          // onChange={onMarkerClick}
                        />
                      </Map>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="incentive-form-bottom">
            <button className="incentive-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default CreateBusiness
export default GoogleApiWrapper({
  apiKey: "AIzaSyDhAq5JksRnXEQwwxCXGNtJpZ_HAPC-XsM",
})(CreateBusiness);
