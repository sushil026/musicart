import React from "react";
import banner from "./Banner.module.css";
import bannerArt from "../../assets/banner.png";
export default function Banner() {
  return (
    <div className={banner.body}>
      <div className={banner.content}>
        <p>Grab upto 50% off on Selected headphones</p>
        <div className={banner.button}>
          <p>Buy Now</p>
        </div>
      </div>
      <img src={bannerArt} alt="banner" />
    </div>
  );
}
