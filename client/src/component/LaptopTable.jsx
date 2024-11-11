import React from "react";
import LaptopImage from "./LaptopImage";
import LaptopDetails from "./LaptopDetails";

const LaptopTable = ({ laptopData }) => {

    
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="mt-32 flex justify-center items-center">
              <LaptopImage imageUrl={laptopData.model_resources} />
            </td>
            <td className="">
              <LaptopDetails details={laptopData} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LaptopTable;
