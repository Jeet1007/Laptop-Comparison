import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/CompareComponent.css";

const LaptopSearch = ({ placeholder, onSelectLaptop }) => {

  const API_URL = import.meta.env.PROD 
      ? import.meta.env.VITE_API_URL_PROD 
      : import.meta.env.VITE_API_URL;
  
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null); // Track selected laptop

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchLaptops = async (searchQuery) => {
    setLoading(true);
    
    const requestData = {
      apikey: import.meta.env.VITE_API_KEY,
      method: "list_models",
      "param[model_name]": searchQuery
    };

    try {
      const res = await axios.post(API_URL, requestData);
      setResult(res.data.result || []);
      setLoading(false);
      setDropdownOpen(true);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setDropdownOpen(value.trim() !== "");
  };

  useEffect(() => {
    if (query.trim() !== "" && query !== selectedLaptop?.name) {
      const delayDebounce = setTimeout(() => {
        fetchLaptops(query);
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [query]);

  const handleOptionClick = (id, name) => {
    onSelectLaptop({ id, name });
    setQuery(name); // Set the query to the selected laptop name
    setSelectedLaptop({ id, name }); // Track selected laptop
    setDropdownOpen(false); // Close dropdown
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar">
      <input
        ref={searchInputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />
      {dropdownOpen && (
        <div ref={dropdownRef} className="dropdown-list">
          {Object.keys(result).length > 0 ? (
            Object.keys(result)
              .slice(0, 50)
              .map((laptop, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() =>
                    handleOptionClick(
                      result[laptop].model_info[0].id,
                      result[laptop].model_info[0].name
                    )
                  }
                >
                  {result[laptop].model_info[0].noteb_name}
                </div>
              ))
          ) : (
            <div className="dropdown-item">
              {loading ? "Loading..." : "No results found."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LaptopSearch;
