import React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 pt-20">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Welcome to King Oil
        </h1>

        <p className="text-xl text-gray-300 text-center max-w-2xl">
          Experience the thrill of the oil game—bid, drill, and manage your
          resources to become the richest player.
        </p>

        {user ? (
          <Link to="/lobby">
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200">
              Enter Lobby
            </button>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/login">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;