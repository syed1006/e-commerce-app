import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar"
import Register from "./components/Register/Register";
import AuthState from "./context/Auth/AuthState";
import CartState from "./context/Cart/CartState";

const App = () => {
    return (
        <div className="main-container">
            <BrowserRouter>
            <CartState>
                <AuthState>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path='/' element={<Home/>} key='home'/>
                    </Routes>
                </AuthState>
            </CartState>
            </BrowserRouter>
        </div>
    )
}

export default App;