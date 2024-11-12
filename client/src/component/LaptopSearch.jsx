import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CompareComponent.css";

const LaptopSearch = ({ placeholder, onSelectLaptop }) => {
  const [query, setQuery] = useState(""); // The search query
  const [loading, setLoading] = useState(false); // Loading state
  const [result, setResult] = useState([]); // Search result
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility

  // Function to fetch laptops from the API
  const fetchLaptops = async (searchQuery) => {
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("apikey", `${import.meta.env.VITE_API_KEY}`);
    formData.append("method", "list_models");
    formData.append("param[model_name]", searchQuery);
    // console.log(searchQuery);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}`, // API URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update state with the results
      setResult(res.data.result || []);
      setLoading(false); // Stop loading
      setDropdownOpen(true); // Open dropdown
    } catch (err) {
      console.error("Error:", err);
      setLoading(false); // Stop loading in case of error
    }
  };

  // Handle input change, update query state
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update query state
    if (value.trim() !== "") {
      setDropdownOpen(true); // Show dropdown
    } else {
      setDropdownOpen(false); // Hide dropdown
    }
  };

  // Trigger the API call when query changes
  useEffect(() => {
    if (query.trim() !== "") {
      const delayDebounce = setTimeout(() => {
        fetchLaptops(query);
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setDropdownOpen(false); // Hide dropdown when query is empty
    }
  }, [query]); // Run effect whenever `query` changes

  // Handle selection of a laptop from the dropdown
  const handleOptionClick = (id, name) => {
    onSelectLaptop({ id, name });
    setQuery(name); // Set the query to the selected laptop name
    setDropdownOpen(false); // Close dropdown
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
              .slice(0, 50) // Limit to 50 results
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
            <div className="dropdown-item">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LaptopSearch;
