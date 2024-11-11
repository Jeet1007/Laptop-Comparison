import React, { useState } from "react";
import axios from "axios";
import "../styles/CompareComponent.css";

const LaptopSearch = ({ placeholder, onSelectLaptop }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchLaptops = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apikey",`${import.meta.env.VITE_API_KEY}`);
    formData.append("method", "list_models");
    formData.append("param[model_name]", query);

    //console.log(query);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(res.data.result || []);
      setLoading(false);
      setDropdownOpen(true);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") fetchLaptops();
    else setDropdownOpen(false);
  };

  const handleOptionClick = (id, name) => {
    onSelectLaptop({ id, name });
    setQuery(name);
    setDropdownOpen(false);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />
      {loading && <div className="loading">Loading...</div>}
      {dropdownOpen && (
        <div className="dropdown-list">
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
                  {result[laptop].model_info[0].name}
                </div>
              ))
          ) : (
            <div className="dropdown-item">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LaptopSearch;
