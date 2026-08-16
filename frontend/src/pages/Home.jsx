import React, { useState } from "react";


const UserHome = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="h-screen w-full relative overflow-hidden">

      {/* Uber Logo */}
      <img
        className="w-20 absolute left-5 top-5 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Map Placeholder */}
      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-600">
          Google Map
        </h1>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6 shadow-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Where to?
        </h2>

        <div className="space-y-4">

          {/* Pickup Input */}
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter Pickup Location"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
          />

          {/* Destination Input */}
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter Destination"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
          />

        </div>

        {/* Recent Locations */}
        <div className="mt-6">

          <h3 className="text-gray-500 font-semibold mb-3">
            Recent Places
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-4">
              <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                📍
              </div>
              <p>Home</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                💼
              </div>
              <p>Office</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                🎓
              </div>
              <p>NIT Silchar</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserHome;