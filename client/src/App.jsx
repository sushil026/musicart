import axios from "axios";
import React from "react";
import { UserContextProvider } from "./contexts/UserContext";
import { FilterProvider } from "./contexts/FilterContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/Checkout";
import Success from './pages/success/Success'

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <FilterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/product/:prod_id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut/>}/>
            <Route path="/success" element={<Success/>}/>
          </Routes>
        </Router>
      </FilterProvider>
    </UserContextProvider>
  );
}

export default App;
