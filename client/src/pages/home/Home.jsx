import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import home from "./Home.module.css";
import Footer from "../../components/footer/Footer";
import { UserContext } from "../../contexts/UserContext";
import { useFilterContext } from "../../contexts/FilterContext";
import Hero from "../../components/hero/Hero";
import Banner from "../../components/banner/Banner";
import ItemContainer from "../../components/itemContainer/ItemContainer";
import Filters from "../../components/filters/Filters";
import searchIcon from "../../assets/search.svg";
import MobileFooter from "../../components/mobileFooter/MobileFooter";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearch } = useFilterContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function setSearchFilter() {
    setSearch(searchQuery);
  }

  function onENTER(event) {
    if (event.key === "Enter") {
      setSearch(searchQuery);
    }
  }

  return (
    <div className={home.body}>
      {screenWidth > 786 && <Header />}
      <div className={home.container}>
        {screenWidth > 786 && <Hero from={""}/>}
        <Banner />
        <div className={home.searchBar}>
          <input
            type="text"
            placeholder={
              screenWidth > 768 ? "Press 'Enter' to search" : "Search"
            }
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={onENTER}
          />
          <img
            src={searchIcon}
            alt=""
            className={home.icon}
            onClick={() => setSearchFilter()}
          />
        </div>
        <Filters />
        <ItemContainer />
      </div>
      {screenWidth < 786 && <MobileFooter from={"home"}/>}
      {screenWidth > 786 && <Footer />}
    </div>
  );
}
