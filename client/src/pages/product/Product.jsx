import React, { useEffect, useState } from "react";
import prod from "./Product.module.css";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Hero from "../../components/hero/Hero";
import logo from "../../assets/logo.png";
import back from "../../assets/back.svg";
import star from "../../assets/star.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Product() {
  const { id } = useContext(UserContext);
  const { prod_id } = useParams();
  const [productData, setProductData] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`product-details/${prod_id}`);
        const fetchedProductData = response.data.product;
        setProductData(fetchedProductData);
        localStorage.setItem("product", JSON.stringify(fetchedProductData));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (prod_id) {
      fetchData();
    }
  }, [prod_id]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imagesArray = productData?.images || [];
  const handleOtherImageClick = (index) => {
    setMainImageIndex(index);
  };

  const handlePreviousClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  async function addToCart() {
    const prd_price = productData.price;
    const prd_id = productData._id;
    axios.post("addToCart", { id, prod_id: prd_id, prod_price: prd_price });
  }

  function placeOrder() {
    navigate("/checkout", { state: { from: productData.name } });
  }

  return (
    <div className={prod.body}>
      {screenWidth > 786 && <Header />}
      <div className={prod.logo}>
        <img src={logo} alt="logo" />
        <h1>Musicart</h1>
      </div>
      <div className={prod.container}>
        {screenWidth > 786 && <Hero from={productData?.name} />}
        <div className={prod.content}>
          <button className={prod.backToHome} onClick={() => navigate("/")}>
            Back To Products
          </button>
          <button className={prod.backToHome2} onClick={() => navigate("/")}>
            <img src={back} alt="" />
          </button>
          <div className={prod.description}>
            <h2>{productData?.description}</h2>
          </div>
          <div className={prod.details}>
            <div className={prod.images}>
              <div className={prod.main}>
                <div className={prod.img}>
                  <img src={imagesArray[mainImageIndex]} alt="" />
                </div>
              </div>
              <div className={prod.other}>
                {imagesArray.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={prod.img}
                    onClick={() => handleOtherImageClick(index)}
                    style={{
                      display: index === mainImageIndex ? "none" : "flex",
                    }}
                  >
                    <img src={imageUrl} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className={prod.imagePane}>
              <div className={prod.cover}>
                <img src={imagesArray[mainImageIndex]} alt="" />
              </div>
              <div className={prod.navigator}>
                <button onClick={handlePreviousClick}>{"<"}</button>
                {imagesArray.map((imageUrl, index) => (
                  <label key={index} className={prod.radioLabel}>
                    <input
                      type="radio"
                      name="imageRadio"
                      checked={index === mainImageIndex}
                      onChange={() => handleOtherImageClick(index)}
                      className={prod.customRadio}
                    />
                  </label>
                ))}
                <button onClick={handleNextClick}>{">"}</button>
              </div>
            </div>
            <div className={prod.texts}>
              <div className={prod.data}>
                <h2>{productData?.name}</h2>
                <h3 className={prod.desc}>{productData?.description}</h3>
                <div className={prod.reviews}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <img key={index} src={star} alt={`Star ${index}`} />
                  ))}
                  <p>(50 Customer reviews)</p>
                </div>
                <p>Price: &nbsp;&#8377;{productData?.price}</p>
                <p>
                  {productData?.color}&nbsp;|&nbsp;{productData?.type}
                </p>
                <div className={prod.featureBox}>
                  <p>About this item</p>
                  <ul>
                    {productData?.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <b>Available: </b>In Stock
                </p>
                <p>
                  <b>Brand: </b>
                  {productData?.brand}
                </p>
              </div>
              <button className={prod.submit} disabled={id === null} onClick={addToCart}>
                ADD TO CART
              </button>
              <button className={prod.submit} disabled={id === null} onClick={placeOrder}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
      {screenWidth < 786 && <MobileFooter from={"home"} />}
      {screenWidth > 786 && <Footer />}
    </div>
  );
}
