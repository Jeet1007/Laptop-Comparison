import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LaptopSearch from "./LaptopSearch";
import "../styles/CompareComponent.css";

const CompareComponent = () => {
  const [laptop1, setLaptop1] = useState({ id: null, name: "" });
  const [laptop2, setLaptop2] = useState({ id: null, name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Add this effect to fetch laptops on component mount
  }, [laptop1, laptop2]);

  const handleCompare = () => {
    console.log(laptop1.id, laptop2.id);
    if (laptop1.id && laptop2.id) {
      navigate(`/compare/${laptop1.id}/${laptop2.id}`);
    }
  };

  return (
    <div className="navbar">
      <a href="/homePage" className="navbar-logo">
        <h1 className="navbar-title">Laptop Comparison</h1>
      </a>
      <div className="navbar-search">
        <LaptopSearch
          placeholder="Search Laptop 1"
          onSelectLaptop={setLaptop1}
        />
        <LaptopSearch
          placeholder="Search Laptop 2"
          onSelectLaptop={setLaptop2}
        />
        <button
          onClick={handleCompare}
          disabled={!laptop1.id || !laptop2.id}
          className={`compare-button ${
            laptop1.id && laptop2.id ? "active" : ""
          }`}
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default CompareComponent;
