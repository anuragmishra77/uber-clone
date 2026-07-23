import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../Context/Usercontext.jsx";

const API_BASE = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const UserLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE}/users/login`, {
                email,
                password
            }, {
                withCredentials: true
            });
            const data = response.data;

            if (data.token) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
            }

            navigate("/home");
        } catch (err) {
            setError("Unable to login. Please try again." || (err.response && err.response.data && err.response.data.error) || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div className="w-[350px] mt-20 mb-20 bg-gray-200 rounded-2xl shadow-xl overflow-hidden p-6">
                <h1 className="text-3xl font-bold mb-7 text-center">User Login</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
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
                    <div className="mb-6">
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
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition px-2 text-center w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <Link to="/signup" className="text-blue-500 hover:text-blue-700 text-sm mt-6 block text-center">
                    Don't have an account? Sign up
                </Link>
                <Link
                    className="text-blue-500 hover:text-blue-700 text-sm mt-3 block text-center"
                    to="/captainlogin"
                >
                    Captain Login
                </Link>
            </div>
        </div>
    );
}

export default UserLogin;

          