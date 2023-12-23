import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import hero from "./Hero.module.css";
import { UserContext } from "../../contexts/UserContext";

export default function Hero() {
  const { id } = useContext(UserContext);
  return (
    <div className={hero.body}>
      <div className={hero.left}>
        <div className={hero.logo}>
          <img src={logo} alt="logo" />
          <h2>Musicart</h2>
        </div>
        <div className={hero.breadcrumbs}>
          <p>Home</p>
        </div>
      </div>
      {
        id &&
        <div className={hero.right}>
          <div className={hero.cart}>
            <img src={cart} alt="cart" />
            <p>View Cart</p>
          </div>
        </div> 
      }
    </div>
  );
}
