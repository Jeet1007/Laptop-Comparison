import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import HomePage from './views/HomePage'
import Compare from './views/Compare'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Tech from './views/Tech'
import { GetData } from "./context/DataContext";
import ComparisonPage from "./views/ComparisonPage";
import Footer from "./component/Footer";
import NavBar from "@/component/NavBar";
import Test from "./views/Test";
import CompareComponent from "@/component/CompareComponent";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <GetData>
        <Router
          future={{
            v7_startTransition: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
          }}
        >
          <CompareComponent />
          
          <Routes>
            <Route path="/" element={<Navigate to={"/homePage"} />}></Route>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/compare/:id1/:id2" element={<ComparisonPage />} />
            <Route path="/homePage/:id" element={<Compare />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            {/* Techniqual Glossary */}
            <Route path="/homePage/tech" element={<Tech />} />
            <Route path="/test/api" element={<Test/>}/>

          </Routes>
        </Router>
        <Footer />
      </GetData>
    </>
  );
}

export default App;
