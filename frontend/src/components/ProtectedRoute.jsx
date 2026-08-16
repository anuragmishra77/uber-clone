// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { UserDataContext } from "../Context/Usercontext";

// const API_BASE = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

// const ProtectedRoute = ({ children }) => {
//   const { user, setUser } = useContext(UserDataContext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/users/profile`, {
//           withCredentials: true,
//         });

//         setUser(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     if (!user) {
//       verifyUser();
//     } else {
//       setLoading(false);
//     }
//   }, [user, setUser]);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;