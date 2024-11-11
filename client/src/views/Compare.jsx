
import React, { useState, useEffect } from "react";
import axios from "axios";
import LaptopTable from "../component/LaptopTable";

function Compare() {
    const [laptopData, setLaptopData] = useState(null);
    const [loading, setLoading] = useState(true);

  const modelId = "4511"; // replace with actual model_id

    const fetchLaptopData= async()=>{
            setLoading(true);
            const formData=new FormData();
            // formData.append("apikey",`${import.meta.env.VITE_API_KEY}`);
            formData.append("apikey","112233aabbcc");
            formData.append("method","get_model_info");
            formData.append("param[model_id]",modelId);
            console.log(import.meta.env.VITE_API_URL);
    
            try{
                const res=await axios.post(`${import.meta.env.VITE_API_URL}`,formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    },
                });
                setLaptopData(res.data.result[0]);
                //console.log("Hiii");
                console.log(res.data.result[0]);
                setLoading(false);
    
            }catch(err){
                console.log("Error",err);
                setLoading(false);
            }
    
            
        }

    useEffect(()=>{
        fetchLaptopData();
    },[modelId]);

  

  return (
    <div className="container mx-auto py-10">
      {laptopData ? (
        <LaptopTable laptopData={laptopData} />
      ) : (
        <p>Loading laptop data...</p>
      )}
    </div>
  );
}
export default Compare;
