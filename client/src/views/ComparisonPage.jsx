import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompareLaptop from "../component/CompareLaptop";
import { makeNotebRequest } from '@/utils/apiClient';


const ComparisonPage = () => {

  const API_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL_PROD 
    : import.meta.env.VITE_API_URL;
  // const API_URL = import.meta.env.VITE_API_URL_PROD;

  const { id1, id2 } = useParams();
  const [laptopData1, setLaptopData1] = useState(null);
  const [laptopData2, setLaptopData2] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(id1);
  console.log(typeof (id1));

  const fetchLaptopData1 = async () => {
    setLoading(true);
    
    // Send as JSON instead of FormData
    const requestData = {
      apikey: import.meta.env.VITE_API_KEY,
      method: "get_model_info_all",
      "param[model_id]": id1
    };
  
    try {
      // const res = await axios.post(API_URL, requestData);
      const res = await makeNotebRequest(requestData);
      setLaptopData1(res.data.result[0]);
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }
  };

  const fetchLaptopData2 = async () => {
    setLoading(true);
    
    // Send as JSON instead of FormData
    const requestData = {
      apikey: import.meta.env.VITE_API_KEY,
      method: "get_model_info_all",
      "param[model_id]": id2
    };
  
    try {
      const res = await axios.post(API_URL, requestData);
      setLaptopData2(res.data.result[0]);
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }
  };

   console.log(laptopData1);
   console.log(laptopData2);

  useEffect(() => {
    fetchLaptopData1();
    fetchLaptopData2();

  }, [id1, id2]);

  return (
    <>
      {/* <h1>Comparison Page</h1>
      <h2>Product 1: {id1}</h2>
      <h2>Product 2: {id2}</h2> */}
      {loading && <p>Loading...</p>}
      <div className="w-5/6 flex flex-row mx-auto">
        <div className="container w-5/6 mx-auto py-10">
          {laptopData1 ? (
            <CompareLaptop laptopData={laptopData1} />
          ) : (
            <p>Loading laptop data...</p>
          )}
        </div>
        <div className="container w-5/6 mx-auto py-10">
          {laptopData2 ? (
            <CompareLaptop laptopData={laptopData2} />
          ) : (
            <p>Loading laptop data...</p>
          )}
        </div>
      </div>
      {/* <ComboBox /> */}


      {/* <CompareLaptop laptopData1={laptopData1}/>
      <CompareLaptop laptopData2={laptopData2}/> */}

    </>
  );

};

export default ComparisonPage;
