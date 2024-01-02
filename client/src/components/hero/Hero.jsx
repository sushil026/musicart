import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import hero from "./Hero.module.css";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Hero({ from }) {
  const { id } = useContext(UserContext);
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate(`/cart/${id}`);
  };

  return (
    <div className={hero.body}>
      <div className={hero.left}>
        <div className={hero.logo} onClick={() => navigate(`/`)}>
          <img src={logo} alt="logo" />
          <h2>Musicart</h2>
        </div>
        <div className={hero.breadcrumbs}>
          <p onClick={() => navigate(`/`)}>Home</p>
          {from !== "" && <p style={{textDecoration: "none"}}>/</p>}
          <p >{from}</p>
        </div>
      </div>
      {id && !(from === "Cart") && !(from === "Checkout") && (
        <div className={hero.right}>
          <div className={hero.cart} onClick={handleCartClick}>
            <img src={cart} alt="cart" />
            <p>View Cart</p>
          </div>
        </div>
      )}
    </div>
  );
}
