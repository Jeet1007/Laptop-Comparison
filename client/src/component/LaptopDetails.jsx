import React from "react";

const LaptopDetails = ({ details }) => {
    //console.log("-----------------------------------------------------------");
    //console.log("details",details);
  return (
    <div className="text-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Model Information</h2>
        <p>Model Name: {details.model_info[0].name}</p>
        //{console.log("details.model_info.noteb_name",details.model_info[0].name)}
        <p>Launch Date: {details.model_resources.launch_date}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">CPU</h2>
        <p>Producer: {details.cpu.prod}</p>
        <p>Model: {details.cpu.model}</p>
        <p>Base Speed: {details.cpu.base_speed} MHz</p>
        <p>Boost Speed: {details.cpu.boost_speed} MHz</p>
        <p>Cores: {details.cpu.cores}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Memory</h2>
        <p>Size: {details.memory.size} GB</p>
        <p>Type: {details.memory.type}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Storage</h2>
        <p>Capacity: {details.primary_storage.cap} GB</p>
        <p>Type: {details.primary_storage.model}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Display</h2>
        <p>Resolution: {details.display.horizontal_resolution} x {details.display.vertical_resolution}</p>
        <p>Type: {details.display.type}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Battery</h2>
        <p>Capacity: {details.battery.capacity} Wh</p>
        <p>Life: {details.battery_life_hours}</p>
      </div>
    </div>
  );
};

export default LaptopDetails;
