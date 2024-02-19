import React, { useContext } from "react";
import card from "./Card.module.css";
import { useFilterContext } from "../../contexts/FilterContext";
import cart from "../../assets/addToCart.svg";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Card({
  prod_id,
  name,
  cover,
  price,
  description,
  color,
  type,
}) {
  const { view } = useFilterContext();
  const { id, setQuantity } = useContext(UserContext);
  const navigate = useNavigate();
  async function addToCart() {
    setQuantity((prev)=>prev+1);
    axios.post("addToCart", { id, prod_id, price });
  }

  return (
    <div className={card[view]} onClick={() => navigate(`/product/${prod_id}`)}>
      <div className={card.image}>
        <img className={card.cover} src={cover} alt="prod. image" />
        {id && (
          <div className={card.addToCart} onClick={(e) => e.stopPropagation()}>
            <img className={card.icon} src={cart} alt="" onClick={addToCart} />
          </div>
        )}
      </div>
      <div className={card.data}>
        <p className={card.name}>{name}</p>
        <p className={card.price}>Price: &nbsp;&#8377;{price}</p>
        <span>
          <span className={card.color}>{color}</span>
          {" | "}
          <span className={card.type}>{type}</span>
        </span>
        <p className={card.desc}>{description}</p>
      </div>
    </div>
  );
}
