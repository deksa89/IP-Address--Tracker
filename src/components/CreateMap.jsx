import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { UpdateCenter } from "./Control";
import L from 'leaflet';
import marker from '../images/icon-location.svg';

import './map.css'

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [30,45],     
});




const CreateMap = ({ lat, lng }) => {

  return (
    <div className="map-container">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[lat, lng]}
        zoom={14}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <UpdateCenter center={[lat, lng]} />
        <Marker position={[lat, lng]} icon={ myIcon }>
          <Popup>Your ISP provider is here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CreateMap;
