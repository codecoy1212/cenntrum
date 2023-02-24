// import React, { Component } from "react";
// import "./map.css";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // for google map places autocomplete
//       address: "",

//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {},

//       mapCenter: {
//         lat: 49.2827291,
//         lng: -123.1207375,
//       },
//     };
//   }

//   handleChange = (address) => {
//     this.setState({ address });
//   };

//   handleSelect = (address) => {
//     this.setState({ address });
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         console.log("Success", latLng);

//         // update center state
//         this.setState({ mapCenter: latLng });
//       })
//       .catch((error) => console.error("Error", error));
//   };

//   render() {
//     return (
//       <div id="googleMaps" style={{ width: "50vh", height: "50vh" }}>
//         <PlacesAutocomplete
//           value={this.state.address}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 className="map-input"
//                 {...getInputProps({
//                   placeholder: "Search Places ...",
//                   // className: "location-search-input",
//                   className: "map-input",
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? {
//                         backgroundColor: "#fafafa",
//                         cursor: "pointer",
//                         // padding: "10px",
//                       }
//                     : {
//                         backgroundColor: "#ffffff",
//                         cursor: "pointer",
//                         // padding: "10px",
//                         margin: "10px",
//                       };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>

//         <Map
//           google={this.props.google}
//           initialCenter={{
//             lat: this.state.mapCenter.lat,
//             lng: this.state.mapCenter.lng,
//           }}
//           center={{
//             lat: this.state.mapCenter.lat,
//             lng: this.state.mapCenter.lng,
//           }}
//           zoom={14}
//           containerStyle={{ height: "50vh", width: "inherit" }}
//         >
//           <Marker
//             position={{
//               lat: this.state.mapCenter.lat,
//               lng: this.state.mapCenter.lng,
//             }}
//           />
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDhAq5JksRnXEQwwxCXGNtJpZ_HAPC-XsM",
// })(MapContainer);

import React, { Component, useState } from "react";
import "./map.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const initialState = {
  address: "",
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  // mapCenter: {
  //   lat: 49.2827291,
  //   lng: -102.1207375,
  // },
  lat: 49.282735,
  lng: -102.1207375,
  mapCenter: "",
};

export const MapContainer = (props) => {
  const [state, setState] = useState(initialState);
  const {
    address,
    showingInfoWindow,
    activeMarker,
    selectedPlace,
    lat,
    lng,
    mapCenter,
  } = state;
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
        setState({ lat: latLng.lat, lng: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
  };

  console.log(lat, lng);

  return (
    <div id="googleMaps" style={{ width: "50vh", height: "50vh" }}>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
          lat: lat,
          lng: lng,
        }}
        center={{
          // mapCenter.lat
          // ()
          lat: lat,
          lng: lng,
        }}
        zoom={14}
        containerStyle={{ height: "50vh", width: "inherit" }}
      >
        <Marker
          position={{
            lat: lat,
            lng: lng,
          }}
        />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDhAq5JksRnXEQwwxCXGNtJpZ_HAPC-XsM",
})(MapContainer);
