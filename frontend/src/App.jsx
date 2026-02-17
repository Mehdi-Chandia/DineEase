import React,{useEffect} from "react";
import './App.css'
import AOS from 'aos';
import "aos/dist/aos.css";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Footer from "./components/Footer.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route,Routes,BrowserRouter} from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import Cart from "./pages/Cart.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Reservation from "./pages/Reservation.jsx";


function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

  return (
    <>
        <CartProvider>
      <Navbar/>
        <div className="relative z-10 min-h-screen pt-20">
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/menu" element={<Menu/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/reservation" element={<Reservation/>}></Route>
        </Routes>
        </div>
        <Footer/>
        </CartProvider>
    </>
  )
}

export default App
