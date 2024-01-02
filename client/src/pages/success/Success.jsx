import React, { useEffect, useState } from "react";
import success from "./Success.module.css";
import Header from "../../components/header/Header";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Footer from "../../components/footer/Footer";
import logo from "../../assets/logo.png";
import confetti from '../../assets/confetti.png'
import { useNavigate } from "react-router-dom";

export default function Success() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function reset() {
    navigate("/");
  }
  
  return (
    <div className={success.body}>
      {screenWidth > 786 && <Header />}
      <div className={success.logo}>
        <img src={logo} alt="logo" />
        <h1>Musicart</h1>
      </div>
      <div className={success.container}>
        <div className={success.content}>
            <img src={confetti} alt="" />
            <h1>Order is placed successfully!</h1>
            <h3>You will be receiving a confirmation email with order details</h3>
            <button className={success.submit} onClick={reset}>Go back to Home page</button>
        </div>
      </div>
      {screenWidth < 786 && <MobileFooter from={"home"} />}
      {screenWidth > 786 && <Footer />}
    </div>
  );
}
