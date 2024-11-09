import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
function Compare(){
    const [data, setData]=useState([]);
    const [loading, setLoading]=useState(true);

    const fetchLaptop= async()=>{
        setLoading(true);
        const formData=new FormData();
        // formData.append("apikey",`${import.meta.env.VITE_API_KEY}`);
        formData.append("apikey","112233aabbcc");
        formData.append("method","get_model_info");
        formData.append("param[model_id]","4511");
        console.log(import.meta.env.VITE_API_URL);
        //console.log(import.meta.env.rest);

        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            });
            setData(res.data.result[0]);
            console.log("Hiii");
            console.log(res.data.result[0]);
            setLoading(false);

        }catch(err){
            console.log("Error",err);
            setLoading(false);
        }

        
    }
 
 
    useEffect(()=>{
        fetchLaptop();

    },[]);
    return(
        <div>
            <h1 className="text-red-700 text-4xl text-center">Compare</h1>
            <div>
                {loading ? <h1>Loading...</h1> :(
                    <div>
                        {data.model_info.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <h1>{item.name}</h1>
                                   
                                </div>
                            )
                        })}
                    </div>
                )}
               
            </div>
        </div>
    )
}
export default Compare;