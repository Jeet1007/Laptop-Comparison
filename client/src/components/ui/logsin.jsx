import React from "react";
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="flex justify-center space-x-4">
     <Link to="/login"> <button className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 transition" >Login</button></Link>
      <Link to="/signup">
      <button className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 transition">Sign Up</button>
      </Link>
    </div>
  );
};

export default AuthButtons;
