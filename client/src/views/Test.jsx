import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function Test(){

    const [laptopData, setLaptopData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/search', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        
    };

    useEffect(() =>{
        fetchData();
    })
    return(
        <>
            <h1>Hello</h1>
        </>
    )
}

export default Test;