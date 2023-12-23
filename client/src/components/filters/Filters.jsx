import React, { useEffect, useState } from "react";
import axios from "axios";
import grid from "../../assets/grid.svg";
import grid2 from "../../assets/grid2.svg";
import list from "../../assets/list.svg";
import list2 from "../../assets/list2.svg";
import filterStyle from "./Filters.module.css";
import { useFilterContext } from "../../contexts/FilterContext";

export default function Filters() {
  const {
    view,
    setView,
    headphoneType,
    company,
    color,
    price,
    sort,
    handleHeadphoneTypeChange,
    handleCompanyChange,
    handleColorChange,
    handlePriceChange,
    handleSortChange,
  } = useFilterContext();

  useEffect(() => {
    console.log("Effect is running 2");
    const fetchData = async () => {
      try {
        const response = await axios.get("filter");
        // const data = await response.json();
        console.log(response.data);
        // setFilterData(data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={filterStyle.filters}>
      <div className={filterStyle.left}>
        <div className={filterStyle.views} onClick={() => setView("grid")}>
          {view === "grid" ? <img src={grid2} /> : <img src={grid} />}
        </div>
        <div className={filterStyle.views} onClick={() => setView("list")}>
          {view === "list" ? <img src={list2} /> : <img src={list} />}
        </div>
        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select
              id="headphoneType"
              value={headphoneType}
              onChange={handleHeadphoneTypeChange}
            >
              <option value="" disabled>
                Headphone Type &#x2304;
              </option>
              <option value="over-ear">Over-Ear</option>
              <option value="on-ear">On-Ear</option>
              <option value="in-ear">In-Ear</option>
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="company" value={company} onChange={handleCompanyChange}>
              <option value="" disabled>
                Brand&#x2304;
              </option>
              <option value="sony">Sony</option>
              <option value="bose">Bose</option>
              <option value="sennheiser">Sennheiser</option>
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="color" value={color} onChange={handleColorChange}>
              <option value="" disabled>
                Colour&#x2304;
              </option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="price" value={price} onChange={handlePriceChange}>
              <option value="" disabled>
                Price&#x2304;
              </option>
              <option value="0-1000">&#8377;0 - &#8377;1000</option>
              <option value="1000-10000">&#8377;1000 - &#8377;10000</option>
              <option value="10000-20000">&#8377;10000 - &#8377;20000</option>
              <option value="10000-20000"> &gt; &#8377;20000</option>
            </select>
          </div>
        </div>
      </div>
      <div className={filterStyle.right}>
        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="sort" value={sort} onChange={handleSortChange}>
              <option value="" disabled>
                Sort by:&#x2304;
              </option>
              <option value="pl">Price Lowest</option>
              <option value="ph">Price Highest</option>
              <option value="nameAesc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
