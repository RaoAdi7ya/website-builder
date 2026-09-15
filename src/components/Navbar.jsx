import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
      <Link to="/" className="text-xl font-bold text-gray-900">
        Builder AI
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};
