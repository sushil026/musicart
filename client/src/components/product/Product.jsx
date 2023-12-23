import React, { useContext } from "react";
import product from "./Product.module.css";
import { useFilterContext } from "../../contexts/FilterContext";
import addToCart from "../../assets/addToCart.svg";
import { UserContext } from "../../contexts/UserContext";

export default function Product() {
  const { view } = useFilterContext();
  const { id } = useContext(UserContext);

  return (
    <div className={product[view]}>
      <div className={product.image}>
        <img
          className={product.cover}
          src="https://m.media-amazon.com/images/I/616M7zrOi1L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          alt="prod. image"
        />
        {id && (
          <div className={product.addToCart}>
            <img className={product.icon} src={addToCart} alt="" />
          </div>
        )}
      </div>
      <div className={product.data}>
        <p className={product.name}>Marshall Major III Voice</p>
        <p className={product.price}>Price: &nbsp;&#8377;12999</p>
        <span>
          <span className={product.color}>Brown</span>
          {" | "}
          <span className={product.type}>On-Ear</span>
        </span>
        <p className={product.desc}>
          ZEBRONICS Zeb Duke 101 Wireless Headphone with Mic, Supporting
          Bluetooth 5.0, AUX Input Wired Mode, mSD Card Slot, Dual Pairing, On
          Ear & 12 hrs Play Back time,FM, Media/Call Controls (Blue)
        </p>
      </div>
    </div>
  );
}
