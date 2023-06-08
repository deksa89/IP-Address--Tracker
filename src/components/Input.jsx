import React, { useState } from "react";
import axios from "axios";
import CreateMap from "./CreateMap";
import { useQuery } from "@tanstack/react-query";

import './input.css'

const InputComponent = () => {
  const [ip, setIp] = useState("");

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=e1ba80b5c7a64f0fb61db1f286d78562&ip=${ip}`
        )
        .then((res) => res.data),
  });
  // console.log("data: ", data)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  const handleIpChange = (e) => {
    setIp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await refetch();
    setIp("");
  };

  return (
    <div className="input_main">
      <form onSubmit={handleSubmit}>
          <div className="input_header">
            <h1 className='app_title'>Ip Address Tracker</h1>
            <div className="input_div">
              <input className="input_inp" type="text" placeholder="Search for any IP address or domain" onChange={handleIpChange} value={ip} />
              <button className="button__input" type="submit"></button>
            </div>
            <div className="location_details">
              <div className="location_expl">
                <p className="location_name">IP ADDRESS</p>
                <h2 className="location_data"> {data.ip}</h2>
              </div>
              <p className="separator"></p>
              <div className="location_expl">
                <p className="location_name">LOCATION</p>
                <h2 className="location_data">{data.city}, {data.country_code3}</h2>
              </div>
              <p className="separator"></p>
              <div className="location_expl">
                <p className="location_name">TIMEZONE</p>
                <h2 className="location_data">{data.time_zone.offset}</h2>
              </div>
              <p className="separator"></p>
              <div className="location_expl">
                <p className="location_name">ISP</p>
                <h2 className="location_data">{data.isp}</h2>
              </div>
            </div>
          </div>
        <CreateMap lat={data.latitude} lng={data.longitude} />
      </form>
    </div>
  );
};

export default InputComponent;
