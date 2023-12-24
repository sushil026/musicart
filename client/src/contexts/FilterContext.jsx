import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContext = createContext();

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [view, setView] = useState("grid");

  const updateViewBasedOnScreenWidth = () => {
    if (window.innerWidth < 768) {
      setView("grid");
    }
  };

  useEffect(() => {
    updateViewBasedOnScreenWidth();
    window.addEventListener("resize", updateViewBasedOnScreenWidth);
    return () => {
      window.removeEventListener("resize", updateViewBasedOnScreenWidth);
    };
  }, []);

  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [range, setRange] = useState("x");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const [fromTo, setFromTo] = useState({ from: null, to: null });

  const handleRangeChange = (event) => {
    setRange(event.target.value);
    const rng = event.target.value;
    let from, to;
    switch (rng) {
      case "a":
        from = 0;
        to = 1000;
        break;
      case "b":
        from = 1000;
        to = 10000;
        break;
      case "c":
        from = 10000;
        to = 20000;
        break;
      case "d":
        from = 20000;
        break;
      default:
        from = null;
        to = null;
        break;
    }
    setFromTo({ from, to });
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (type) params.type = type;
        if (brand) params.brand = brand;
        if (color) params.color = color;
        if (sort) params.sort = sort;
        if (search) params.search = search;
        if (fromTo.from !== null) params.from = fromTo.from;
        if (fromTo.to !== null) params.to = fromTo.to;
        const response = await axios.get("products", { params });
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [brand, color, type, range, sort, fromTo, search]);

  const contextValue = {
    view,
    setView,
    type,
    setType,
    brand,
    setBrand,
    color,
    setColor,
    range,
    setRange,
    sort,
    setSort,
    filteredData,
    search,
    setSearch,
    handleTypeChange,
    handleBrandChange,
    handleColorChange,
    handleRangeChange,
    handleSortChange,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
