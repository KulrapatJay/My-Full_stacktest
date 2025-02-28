import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ระบบจัดการงาน</Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/Creat" className="hover:text-gray-400">Creat</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Navbar;