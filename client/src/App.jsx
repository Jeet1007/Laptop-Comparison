import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import HomePage from './views/HomePage'
import Compare from './views/Compare'



function App() {



  return (
    <>
      <Router future={{
        v7_startTransition: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true
      }}>
        <Routes>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/homePage/compare" element={<Compare />} />
        </Routes>
      </Router>




    </>
  )
}

export default App
