import React, { useState,useEffect,useContext } from "react";
import SearchBar from "./searchBar";

import { DataContext } from "../context/DataContext";

const NavBar = () => {
  const { isOpen, setIsOpen } = useContext(DataContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);


  return (
    <>

      <div className="m-auto w-10/12 flex justify-end  md:w-11/12 md:flex md:justify-end">
        <div>
          <input type="text" onClick={() => setIsOpen(true)} className="border-2 border-gray-300 p-1 w-full text-white rounded-xl mr-5 bg-black" placeholder="/Search" />
        </div>
        {isOpen && <SearchBar />}
      </div>
    </>
  );
};

export default NavBar;
