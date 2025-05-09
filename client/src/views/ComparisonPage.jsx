import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompareLaptop from "../component/CompareLaptop";


const ComparisonPage = () => {

  const API_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL_PROD 
    : import.meta.env.VITE_API_URL;
    
  const { id1, id2 } = useParams();
  const [laptopData1, setLaptopData1] = useState(null);
  const [laptopData2, setLaptopData2] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(id1);
  console.log(typeof (id1));

  const fetchLaptopData1 = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apikey", `${import.meta.env.VITE_API_KEY}`);
    //formData.append("apikey", "112233aabbcc");
    formData.append("method", "get_model_info_all");
    formData.append("param[model_id]", id1);
    console.log(import.meta.env.VITE_API_URL);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      setLaptopData1(res.data.result[0]);
      setLoading(false);

    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }


  }

  const fetchLaptopData2 = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apikey", `${import.meta.env.VITE_API_KEY}`);
    //formData.append("apikey", "112233aabbcc");
    formData.append("method", "get_model_info_all");
    formData.append("param[model_id]", id2);
    console.log(import.meta.env.VITE_API_URL);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      setLaptopData2(res.data.result[0]);
      setLoading(false);

    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }


  }

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
