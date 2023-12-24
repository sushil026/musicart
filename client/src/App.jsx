import axios from "axios";
import React  from "react";
import { UserContextProvider } from "./contexts/UserContext";
import { FilterProvider } from "./contexts/FilterContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

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
          </Routes>
        </Router>
      </FilterProvider>
    </UserContextProvider>
  );
}

export default App;
