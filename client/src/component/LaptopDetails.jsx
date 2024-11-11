
import React from 'react';
import Details from './Details';

const LaptopDetails = ({ details }) => {
  return (
    <div>

     <Details name={"CPU"} part_name={details.cpu} select={details.cpu.selected} />
     <Details name={"Display"} part_name={details.display} select={details.display.selected} />
     <Details name={"Memory"} part_name={details.memory} select={details.memory.selected} />
      <Details name={"Motherboard"} part_name={details.motherboard} select={details.motherboard.selected} />
     
      <Details name={"Storage"} part_name={details.primary_storage} select={details.primary_storage.selected} />
  
      <Details  name={"Battery"} part_name={details.battery} select={details.battery.selected} />
      <Details name={"Wireless"} part_name={details.wireless} select={details.wireless.selected} />
      <Details name={"Operating System"} part_name={details.operating_system} select={details.operating_system.selected} />
      <Details name={"Warranty"} part_name={details.warranty} select={details.warranty.selected} />

     
    </div>
  );
};

export default LaptopDetails;