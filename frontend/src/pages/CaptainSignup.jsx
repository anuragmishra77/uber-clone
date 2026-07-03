import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

function CaptainSignup() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleType, setVehicleType] = useState("car");
    const [vehicleColor, setVehicleColor] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/captains/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: {
                        firstname,
                        lastname,
                    },
                    email,
                    password,
                    vehicle: {
                        type: vehicleType,
                        color: vehicleColor,
                        licensePlate,
                        capacity: Number(capacity),
                    },
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || (data.errors && data.errors[0]?.msg) || "Signup failed");
                setLoading(false);
                return;
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            navigate("/captainlogin");
        } catch (err) {
            setError("Unable to complete signup. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div className="w-[420px] bg-gray-200 rounded-2xl shadow-xl p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Captain Signup</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                                First Name
                            </label>
                            <input
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Password"
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">
                                Vehicle Type
                            </label>
                            <select
                                id="vehicleType"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="car">Car</option>
                                <option value="auto">Auto</option>
                                <option value="bike">Bike</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                min={1}
                                placeholder="Capacity"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleColor">
                            Vehicle Color
                        </label>
                        <input
                            id="vehicleColor"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Vehicle color"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licensePlate">
                            License Plate
                        </label>
                        <input
                            id="licensePlate"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="License plate"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition w-full"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </form>

                <p className="text-sm text-center mt-5">
                    Already registered?{' '}
                    <Link className="text-blue-500 hover:text-blue-700" to="/captainlogin">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default CaptainSignup;