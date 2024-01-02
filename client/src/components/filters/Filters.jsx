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
    type,
    brand,
    color,
    range,
    sort,
    handleTypeChange,
    handleBrandChange,
    handleColorChange,
    handleRangeChange,
    handleSortChange,
  } = useFilterContext();

  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("filter");
        const data = await response.data;
        setBrandList(data.brands);
        setColorList(data.colors);
        setTypeList(data.types);
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
          <img src={view === "grid" ? grid2 : grid} alt="Grid View" />
        </div>
        <div className={filterStyle.views} onClick={() => setView("list")}>
          <img src={view === "list" ? list2 : list} alt="List View" />
        </div>

        {/* Reusable Select Component */}
        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="type" value={type} onChange={handleTypeChange}>
              <option value="" disabled>
                Headphone Type &#x2304;
              </option>
              <option value="">Featured</option>
              {typeList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="brand" value={brand} onChange={handleBrandChange}>
              <option value="" disabled>
                Brand&#x2304;
              </option>
              <option value="">Featured</option>
              {brandList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="color" value={color} onChange={handleColorChange}>
              <option value="" disabled>
                Colour&#x2304;
              </option>
              <option value="">Featured</option>
              {colorList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="range" value={range} onChange={handleRangeChange}>
              <option value="x" disabled>
                Price&#x2304;
              </option>
              <option value="x">Featured</option>
              <option value="a">&#8377;0 - &#8377;1000</option>
              <option value="b">&#8377;1000 - &#8377;10000</option>
              <option value="c">&#8377;10000 - &#8377;20000</option>
              <option value="d"> &gt; &#8377;20000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sorting Section */}
      <div className={filterStyle.right}>
        <div className={filterStyle.selectContainer}>
          <div className={filterStyle.customSelect}>
            <select id="sort" value={sort} onChange={handleSortChange}>
              <option value="" disabled>
                Sort by:&#x2304;
              </option>
              <option value="">Featured</option>
              <option value="price-aesc">Price - Lowest</option>
              <option value="price-desc">Price - Highest</option>
              <option value="A-to-Z">Name (A-Z)</option>
              <option value="Z-to-A">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
