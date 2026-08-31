import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Left Side - Logo (Click karne par Home par jayega) */}
      <Link to="/" className="text-2xl font-extrabold text-[var(--color-zoom-blue)] tracking-wide cursor-pointer">
        CodeXpert
      </Link>

      {/* Right Side - Login & Signup Links */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link 
          to="/login" 
          className="text-gray-600 hover:text-[var(--color-zoom-blue)] font-semibold px-4 py-2 transition-colors"
        >
          Log In
        </Link>
        
        <Link 
          to="/signup" 
          className="bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-semibold px-5 py-2 rounded-lg transition-colors shadow-md"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;