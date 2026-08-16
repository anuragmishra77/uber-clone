import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import { UserDataContext } from "./Context/Usercontext";

//import ProtectedRoute from "./components/ProtectedRoute";

import Start from "./pages/Start";
import Login from "./pages/UserLogin";
import Signup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import Captainhome from "./pages/Captainhome";

function App() {
    const { user, setUser } = useContext(UserDataContext);

    useEffect(() => {
        console.log("app started");
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/captainlogin" element={<CaptainLogin />} />
                <Route path="/captainsignup" element={<CaptainSignup />} />

                <Route
                    path="/home"
                    element={
                        // <ProtectedRoute>
                        //     <Home />
                        // </ProtectedRoute>
                        <Home/>
                    }
                />

                <Route path="/captainhome" element={<Captainhome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;