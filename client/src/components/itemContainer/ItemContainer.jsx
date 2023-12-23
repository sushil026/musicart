import React from "react";
import container from "./ItemContainer.module.css";
import { useFilterContext } from "../../contexts/FilterContext";
import Product from "../product/Product";

export default function ItemContainer() {
  const { view } = useFilterContext(); 

  const containerClass = view === "grid" ? container.gridContainer : container.flexContainer;
  return (
    <div className={container.body}>
      <div className={`${containerClass}`}>
        <Product/>
      </div>
    </div>
  );
}
