import React from "react";
import LaptopImage from "./LaptopImage";
import LaptopDetails from "./LaptopDetails";

const LaptopTable = ({ laptopData }) => {

    
  return (
  
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr className="">
            <th className="px-4 py-2 text-center">{laptopData.model_info[0].name}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col items-center border-b">
            <td className="mt-20 flex justify-center items-center">
              <LaptopImage imageUrl={laptopData.model_resources} />
            </td>
            <td className="my-5 w-4/5">
                <h1 className="mb-5 text-4xl font-bold text-center">Specifications</h1>
              <LaptopDetails details={laptopData} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LaptopTable;
