import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import home from "./Home.module.css";
import Footer from "../../components/footer/Footer";
import { UserContext } from "../../contexts/UserContext";
import Hero from "../../components/hero/Hero";
import Banner from "../../components/banner/Banner";
import ItemContainer from "../../components/itemContainer/ItemContainer";
import Filters from "../../components/filters/Filters";
import { FilterProvider } from "../../contexts/FilterContext";

export default function Home() {
  const { id } = useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    console.log("jome")
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <FilterProvider>
      {screenWidth > 786 && <Header />}
      <div className={home.body}>
        {screenWidth > 786 && <Hero />}
        <Banner />
        <div className={home.searchBar}>
          <input type="text" placeholder="Search" />
        </div>
        <Filters />
        <ItemContainer />
      </div>
      {screenWidth > 786 && <Footer />}
    </FilterProvider>
  );
}
