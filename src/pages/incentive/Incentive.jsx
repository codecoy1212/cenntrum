import React, { useEffect, useState } from "react";
import "./incentive.css";
// import { GoogleMap, Marker } from "react-google-maps";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
// import Map from "../../components/googleMap/Map";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createIncentive } from "../../redux/features/incentiveSlice";
import FileBase from "react-file-base64";
// import "./map.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "../../axios";
// const render = (status) => {
//   return <h1>{status}</h1>;
// };

// const AnyReactComponent = () => (
//   <div
//     style={{
//       width: 15,
//       height: 15,
//       borderRadius: "50%",
//       backgroundColor: "red",
//       border: "3px solid black",
//     }}
//   ></div>
// );

const initialState = {
  name: "",
  value: "",
  gift_value: "",
  quantity: "",
  req_point: "",
  laat: 31.4689545,
  lang: 74.26450799999999,
  radius: "",
  description: " ",
  cardcode: "",
  locationStatus: false,
  businessList: [],
  business_id: 0,
  expiry_date: "",
  img: "",
};
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
  lng: 74.26450799999999,
  mapCenter: "",
  divStatus: 1,
  expiry_date: "",
};

export const Incentive = (props) => {
  const [state, setState] = useState(initialMapState);
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({
    ...state.incentive,
  }));

  const {
    name,
    value,
    gift_value,
    quantity,
    req_point,
    laat,
    lang,
    radius,
    img,
    cardcode,
    description,
    locationStatus,
    businessList,
    business_id,
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
    divStatus,
  } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formValue).forEach(function (key) {
      formData.append(key, formValue[key]);
    });
    
    // console.log(formValue);
    if (name && value && quantity && req_point) {
      dispatch(createIncentive({ formValue, navigate }));
    }
  };
  useEffect(() => {
    async function fetchData() {
      const req2 = await axios.get("/business_list");
      let name = "businessList";
      let value = req2.data.data;
      setFormValue({ ...formValue, [name]: value });
      // setInterval(fetchData, 1000);
    }
    fetchData();
  }, []);
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onInputChange2 = (e) => {
    let { name, value } = e.target;
    setState({ ...state, divStatus: value });
    setFormValue({ ...formValue, [name]: value });
    console.log(value);
  };

  const onInputChange3 = (e) => {
    let { name, checked } = e.target;
    setFormValue({ ...formValue, [name]: checked });
    console.log(checked);
  };

  const onInputChange4 = (e) => {
    let { name, value } = e.target;
    setState({ ...state, expiry_date: value });
    setFormValue({ ...formValue, [name]: value });
  };

  const uploadImage = (e) => {
    let { name, files } = e.target;
    setState({ ...state, img: files[0] });
    setFormValue({ ...formValue, img: e.target.files[0] });
  };

  const handleChange = (address) => {
    console.log(address);
    setState({ ...state, address });
  };

  // const google = window.location;

  const handleSelect = (address) => {
    setState({ ...state, address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);

        // update center state
        setFormValue({ ...formValue, laat: latLng.lat, lang: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
  };

  // const onMarkerClick = (position, marker, e) =>
  // setFormValue({
  //     selectedPlace: position,
  //     // activeMarker: marker,
  //     // showingInfoWindow: true,
  //   });
  // console.log(selectedPlace.position);

  // console.log(laat, lang);

  // console.log(props.value);

  return (
    <div className="incentive">
      <div className="incentive-top">Create Incentives</div>
      <div className="incentive-form-wrapper">
        <form className="incentive-form" onSubmit={handleSubmit}>
          <div className="incentive-form-container">
            <div
              className={`banner ${
                divStatus == 1 ? "incentive-form" : "incentive-form-left"
              }`}
            >
              <div>
                <div>
                  <label>Incentive Type</label>
                  <select
                    className="incentive-input incentive-select"
                    value={divStatus}
                    name="type"
                    onChange={onInputChange2}
                  >
                    <option value="1">Gift Card</option>
                    <option value="2">Crypto</option>
                  </select>
                </div>
                {divStatus == 1 && (
                  <div>
                    <div>
                      <label>Select Business</label>
                      <select
                        className="incentive-input incentive-select"
                        value={business_id}
                        name="business_id"
                        onChange={onInputChange}
                      >
                        {businessList.map((option) => (
                          <option value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>Gift Card Pre Code</label>
                      <input
                        className="incentive-input"
                        value={cardcode}
                        name="cardcode"
                        placeholder="GiftCode-"
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <label>Gift Card Value</label>
                      <input
                        className="incentive-input"
                        type="number"
                        value={gift_value}
                        name="gift_value"
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <label>Minimum Purchase to Avail Discount</label>
                      <input
                        className="incentive-input"
                        type="number"
                        value={value}
                        name="value"
                        onChange={onInputChange}
                      />
                    </div>
                    {/* <div>
                 <label> Description</label>
                 <textarea
                 
                   className="incentive-input"
                  
                   value={description}
                   name="description"
                   onChange={onInputChange}
                 ></textarea>
                   
               </div> */}
                  </div>
                )}
                <div>
                  <label> Name</label>
                  <input
                    type="text"
                    className="incentive-input"
                    placeholder="Enter Incentive Name"
                    value={name}
                    name="name"
                    onChange={onInputChange}
                  />
                </div>
                {divStatus == 2 && (
                  <div>
                    <label>Quantity of crypto</label>
                    <input
                      type="number"
                      className="incentive-input"
                      placeholder="Enter Quantity Of Crypto"
                      value={value}
                      name="value"
                      onChange={onInputChange}
                    />
                  </div>
                )}
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="incentive-input"
                    placeholder="Enter Number Of Incentive"
                    value={quantity}
                    name="quantity"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <label>Required Points</label>
                  <input
                    type="number"
                    className="incentive-input"
                    placeholder="Enter Required Points"
                    value={req_point}
                    name="req_point"
                    onChange={onInputChange}
                  />
                </div>

                {divStatus == 1 && (
                  <div>
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      className="incentive-input"
                      placeholder="Enter Expiry Date"
                      value={expiry_date}
                      name="expiry_date"
                      onChange={onInputChange4}
                    />
                  </div>
                )}

                {locationStatus && divStatus == 2 && (
                  <div>
                    <label>Max Distance</label>
                    <input
                      type="text"
                      className="incentive-input"
                      placeholder="Max. Distance To Show Incentive"
                      value={radius}
                      name="radius"
                      onChange={onInputChange}
                    />
                  </div>
                )}

                {/* <div style={{ margin: "10px 35px" }}> */}
                <div>
                  <label
                    htmlFor="file"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <PermMediaIcon
                      htmlColor="tomato"
                      style={{ marginRight: "5px" }}
                    />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      name="img"
                      onChange={uploadImage}
                    />
                    {/* <FileBase
                      style={{ display: "none" }}
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setFormValue({ ...formValue, img: base64 })
                      }
                    /> */}
                  </label>
                </div>
              </div>
            </div>

            <div className="incentive-form-right">
              {divStatus == 2 && (
                <h3 className="flex">
                  Sponser Location
                  <input
                    type="checkbox"
                    className="incentive-input"
                    placeholder="Max. Distance"
                    checked={locationStatus}
                    name="locationStatus"
                    onChange={onInputChange3}
                  />
                </h3>
              )}
              {locationStatus && divStatus == 2 && (
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
            <button className="incentive-button">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default Incentive;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDhAq5JksRnXEQwwxCXGNtJpZ_HAPC-XsM",
})(Incentive);
