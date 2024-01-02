import React, { useContext, useState } from "react";
import mobileFooter from "./MobileFooter.module.css";
import home from "../../assets/home.svg";
import cart from "../../assets/cart2.svg";
import login from "../../assets/login.svg";
import logout from "../../assets/logout.svg";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MobileFooter({from}) {
  const { id } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(from);

  async function handleInteractions() {
    if (id) {
      axios.post("logout");
      localStorage.clear();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }

  function openCart() {
    if (id) {
      navigate(`/cart/${id}`);
    }
  }

  return (
    <div className={mobileFooter.body}>
      <div
        className={`${mobileFooter.tabs} ${activeTab === "home" ? mobileFooter.active : ""}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={home} alt="home" className={mobileFooter.icon} />
        <p>Home</p>
      </div>
      <div
        className={`${mobileFooter.tabs} ${activeTab === "cart" ? mobileFooter.active : ""}`}
        onClick={() => {
          openCart();
        }}
      >
        <img src={cart} alt="cart" className={mobileFooter.icon} />
        <p>Cart</p>
      </div>
      <div className={mobileFooter.tabs} onClick={handleInteractions}>
        {!id ? (
          <>
            <img src={login} alt="cart" className={mobileFooter.icon} />
            <p>Login</p>
          </>
        ) : (
          <>
            <img src={logout} alt="cart" className={mobileFooter.icon} />
            <p>Logout</p>
          </>
        )}
      </div>
    </div>
  );
}
