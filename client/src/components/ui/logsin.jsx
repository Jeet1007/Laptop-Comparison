import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 transition">Login</button>
      <button className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 transition">Sign Up</button>
    </div>
  );
};

export default AuthButtons;
