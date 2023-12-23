import React, { createContext, useContext, useState, useEffect } from "react";

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

  const [headphoneType, setHeadphoneType] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  const handleHeadphoneTypeChange = (event) => {
    setHeadphoneType(event.target.value);
    console.log("Selected Headphone Type:", event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    console.log("Selected Company:", event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    console.log("Selected Color:", event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    console.log("Selected Price Range:", event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    console.log("Selected Sort:", event.target.value);
  };

  const contextValue = {
    view,
    setView,
    headphoneType,
    setHeadphoneType,
    company,
    setCompany,
    color,
    setColor,
    price,
    setPrice,
    sort,
    setSort,
    handleHeadphoneTypeChange,
    handleCompanyChange,
    handleColorChange,
    handlePriceChange,
    handleSortChange,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
