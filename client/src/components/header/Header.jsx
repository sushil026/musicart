import React, { useContext } from "react";
import header from "./Header.module.css";
import call from "../../assets/call.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from 'axios';

export default function Header() {
  const { id,setId } = useContext(UserContext);
  const nav = useNavigate();
  async function logout() {
    axios.post("logout");
    setId(null);
    localStorage.clear();
    nav("/")
  }

  return (
    <div className={header.body}>
      <div className={header.left}>
        <img src={call} alt="" />
        <p>912121131313</p>
      </div>
      <div className={header.middle}>
        <p>Get 50% off on selected items | Shop Now</p>
      </div>
      <div className={header.right}>
        {id ? (
          <p onClick={logout}>Logout</p>
        ) : (
          <>  
            <Link to={"/sign-in"} className={header.links}>
              <p>Login</p>
            </Link>
            <Link to={"/sign-up"} className={header.links}>
              <p>Signup</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
