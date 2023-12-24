import React from "react";
import container from "./ItemContainer.module.css";
import { useFilterContext } from "../../contexts/FilterContext";
import Product from "../product/Product";

export default function ItemContainer() {
  const { view, filteredData } = useFilterContext();
  console.log(filteredData);
  console.log(typeof(filteredData));

  const containerClass =
    view === "grid" ? container.gridContainer : container.flexContainer;
  return (
    <div className={container.body}>
      <div className={`${containerClass}`}>
        {filteredData.map((product, index) => (
          <Product 
          key={index}
          prod_id={product.id}
          name={product.name}
          cover={product.cover}
          price={product.price}
          description={product.description}
          color={product.color} 
          type={product.type}
          />
        ))}
      </div>
    </div>
  );
}
