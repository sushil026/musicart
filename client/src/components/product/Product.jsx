import React, { useContext } from "react";
import product from "./Product.module.css";
import { useFilterContext } from "../../contexts/FilterContext";
import addToCart from "../../assets/addToCart.svg";
import { UserContext } from "../../contexts/UserContext";

export default function Product( {prod_id, name, cover, price, description, color, type} ) {
  const { view } = useFilterContext();
  const { id } = useContext(UserContext);

  return (
    <div className={product[view]}>
      <div className={product.image}>
        <img className={product.cover} src={cover} alt="prod. image"/>
        {id && (
          <div className={product.addToCart}>
            <img className={product.icon} src={addToCart} alt="" />
          </div>
        )}
      </div>
      <div className={product.data}>
        <p className={product.name}>{name}</p>
        <p className={product.price}>Price: &nbsp;&#8377;{price}</p>
        <span>
          <span className={product.color}>{color}</span>
          {" | "}
          <span className={product.type}>{type}</span>
        </span>
        <p className={product.desc}>
          {description}
        </p>
      </div>
    </div>
  );
}
