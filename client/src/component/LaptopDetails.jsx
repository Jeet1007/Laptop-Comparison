import React from 'react';
import Details from './Details';
import { Link } from 'react-router-dom';

const LaptopDetails = ({ details }) => {
  return (
    <div>
      <Details name={"CPU"} part_name={details.cpu} select={details.cpu.selected} />
      <Link 
        to={`/homePage/tech?query=CPU`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about CPU specifications →
      </Link>

      <Details name={"Display"} part_name={details.display} select={details.display.selected} />
      <Link 
        to={`/homePage/tech?query=Display`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Display specifications →
      </Link>

      <Details name={"Memory"} part_name={details.memory} select={details.memory.selected} />
      <Link 
        to={`/homePage/tech?query=RAM`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Memory specifications →
      </Link>

      <Details name={"Motherboard"} part_name={details.motherboard} select={details.motherboard.selected} />
      <Link 
        to={`/homePage/tech?query=Motherboard`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Motherboard specifications →
      </Link>
     
      <Details name={"Storage"} part_name={details.primary_storage} select={details.primary_storage.selected} />
      <Link 
        to={`/homePage/tech?query=SSD`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Storage specifications →
      </Link>
  
      <Details name={"Battery"} part_name={details.battery} select={details.battery.selected} />
      <Link 
        to={`/homePage/tech?query=Battery`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Battery specifications →
      </Link>

      <Details name={"Wireless"} part_name={details.wireless} select={details.wireless.selected} />
      <Link 
        to={`/homePage/tech?query=WiFi`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Wireless specifications →
      </Link>

      <Details name={"Operating System"} part_name={details.operating_system} select={details.operating_system.selected} />
      <Link 
        to={`/homePage/tech?query=Operating System`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Operating System specifications →
      </Link>

      <Details name={"Warranty"} part_name={details.warranty} select={details.warranty.selected} />
      <Link 
        to={`/homePage/tech?query=Warranty`} 
        className="block text-blue-500 hover:text-blue-700 text-sm mb-6 text-right"
      >
        Learn more about Warranty specifications →
      </Link>
    </div>
  );
};

export default LaptopDetails;