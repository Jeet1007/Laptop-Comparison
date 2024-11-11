import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const DataContext = createContext();

const GetData = ({ children}) =>{
    const [isOpen, setIsOpen] = useState(false);


    return(
    <DataContext.Provider value={{isOpen, setIsOpen}}>
        {children}
    </DataContext.Provider>
    )
};

export {DataContext, GetData};