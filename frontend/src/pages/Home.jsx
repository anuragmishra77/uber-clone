import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">

      <div className="w-[350px] bg-gray-200 rounded-2xl shadow-xl overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800"
          alt="Uber"
          className="w-full h-100 object-cover"
        />

        <div className="p-6 flex-col items-center">

          <h1 className="text-3xl font-bold mb-7 items-center text-center">
            Welcome
          </h1>

          <Link
            className="bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition px-2 text-center w-full block text-center"
            to="/login"
          >
            Continue
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;