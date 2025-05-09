import React, { useState, useEffect } from "react";
import axios from "axios";
import LaptopTable from "../component/LaptopTable";
import TextArea from "../component/TextArea";
import Comment from "../component/Comment";
import { useParams } from "react-router-dom";
import { makeNotebRequest } from '@/utils/apiClient';

function Compare() {
    const API_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL_PROD 
    : import.meta.env.VITE_API_URL;
    // const API_URL = import.meta.env.VITE_API_URL_PROD;


    const [laptopData, setLaptopData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    

    const modelId = "4511"; // replace with actual model_id

    const fetchLaptopData = async () => {
        setLoading(true);
        
        const requestData = {
            apikey: import.meta.env.VITE_API_KEY,
            method: "get_model_info_all",
            "param[model_id]": id
        };
      
        try {
            // const res = await axios.post(API_URL, requestData);
            const res = await makeNotebRequest(requestData);
            setLaptopData(res.data.result[0]);
            setLoading(false);
        } catch (err) {
            console.log("Error", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLaptopData();
    }, [modelId]);



    return (
        <>
            <div className="container w-5/6 mx-auto py-10">
                {laptopData ? (
                    <LaptopTable laptopData={laptopData} />
                ) : (
                    <p>Loading laptop data...</p>
                )}
            </div>
            <div className="">
            <div className="mb-4 w-5/6 mx-auto">
                <Comment />
            </div>
            </div>
        </>
    );
}
export default Compare;
