import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import check from "./CheckOut.module.css";
import Header from "../../components/header/Header";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Footer from "../../components/footer/Footer";
import logo from "../../assets/logo.png";
import back from "../../assets/back.svg";
import Hero from "../../components/hero/Hero";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function CheckOut() {
  const {id} = useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [checkoutData, setCheckoutData] = useState(null);
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  const [total, setTotalAmount] = useState();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();
  const from = location.state && location.state.from;

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const response = await axios.get(`product-for-cart/${productId}`);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    const fetchCheckoutData = async () => {
      try {
        let dataToSet = null;
        if (from === "Cart") {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          if (localCart.length > 0) {
            dataToSet = localCart;
          }
        } else {
          const productData = JSON.parse(localStorage.getItem("product"));
          dataToSet = productData;
        }
        setCheckoutData(dataToSet);
        if (dataToSet && dataToSet.length > 0) {
          const itemPromises = dataToSet.map((item) =>
            fetchData(item.productId)
          );
          const itemResults = await Promise.all(itemPromises);
          const totalAmount = itemResults.reduce((total, item, index) => {
            const itemTotal = item.price * dataToSet[index].quantity;
            return total + itemTotal;
          }, 0);
          setItemData(itemResults);
          setTotalAmount(totalAmount);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCheckoutData();
  }, [from, id]);

  async function finalCheckout() {
    if( from === "Cart"){
      try {
        axios.post(`/clear-cart/${id}`);
        navigate("/success");
      } catch (error) {
        console.error(error);
      }
    }else{
      navigate("/success");
    }
  }

  return (
    <div className={check.body}>
      {screenWidth > 786 && <Header />}
      <div className={check.logo}>
        <img src={logo} alt="logo" />
        <h1>Musicart</h1>
      </div>
      <div className={check.container}>
        {screenWidth > 786 && <Hero from={"Checkout"} />}
        <div className={check.content}>
          <button className={check.backToHome} onClick={() => navigate(-1)}>
            Back To {from}
          </button>
          <button className={check.backToHome2} onClick={() => navigate(-1)}>
            <img src={back} alt="" />
          </button>
          <div className={check.head}>
            <h1>Checkout</h1>
          </div>
          <div className={check.details}>
            <div className={check.checkout_info}>
              <div className={check.parts}>
                <div style={{ color: "#B52B00" }}>
                  <p>1.Delivery Address</p>
                </div>
                <div style={{ color: "#797979" }}>
                  <p>
                    Akash Patel <br /> 104 <br />
                    kk hh nagar, Lucknow <br /> Uttar Pradesh 226025
                  </p>
                </div>
              </div>
              <div className={check.parts}>
                <div style={{ color: "#B52B00" }}>
                  <p>2.Payment method</p>
                </div>
                <div style={{ color: "#797979" }}>
                  <p>Pay on delivery (Cash/Card)</p>
                </div>
              </div>
              <div className={check.parts}>
                <div style={{ color: "#B52B00" }}>
                  <p>3.Review Items & Delivery</p>
                </div>
                <div className={check.itemReview}>
                  {!(from === "Cart") ? (
                    checkoutData ? (
                      <>
                        <div className={check.cover}>
                          <img src={checkoutData?.images[0]} alt="" />
                        </div>
                        <p
                          style={{
                            margin: "0",
                            color: "black",
                            fontWeight: "700",
                          }}
                        >
                          {checkoutData?.name}
                        </p>
                        <p style={{ margin: "0" }}>
                          Color: {checkoutData?.color}
                        </p>
                        <p style={{ margin: "0" }}>In Stock</p>
                        <p
                          style={{
                            margin: "0",
                            color: "black",
                            fontWeight: "700",
                          }}
                        >
                          Estimated delivery :<br />
                          Monday — FREE Standard Delivery
                        </p>
                        {from === "Cart" && (
                          <div style={{ color: "#B52B00" }}></div>
                        )}
                      </>
                    ) : null
                  ) : checkoutData && checkoutData.length > 0 ? (
                    checkoutData.map((item, index) => (
                      <div key={index} className={check.cartItem}>
                        <div className={check.cover}>
                          <img src={itemData[index]?.cover} alt="" />
                        </div>
                        <p
                          style={{
                            margin: "0",
                            color: "black",
                            fontWeight: "700",
                          }}
                        >
                          {itemData[index]?.name}
                        </p>
                        <p style={{ margin: "0" }}>
                          Color: {itemData[index]?.color}
                        </p>
                        <p style={{ margin: "0" }}>In Stock</p>
                        <p style={{ margin: "0" }}>Quantity: {item.quantity}</p>
                        <p
                          style={{
                            margin: "0",
                            color: "black",
                            fontWeight: "700",
                          }}
                        >
                          Estimated delivery :<br />
                          Monday — FREE Standard Delivery
                        </p>
                        {from === "Cart" && (
                          <div style={{ color: "#B52B00" }}></div>
                        )}
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            </div>
            <div className={check.checkout_summary}>
              <button className={check.submit} onClick={finalCheckout}>
                PLACE YOUR ORDER
              </button>
              <p style={{ margin: "0.5rem 0" }}>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
              <div className={check.line}></div>
              <p
                style={{
                  fontSize: "x-large",
                  margin: "0.5rem 0",
                  textAlign: "start",
                  width: "80%",
                }}
              >
                Order Summary
              </p>
              <div className={check.innerDivs}>
                <p>Item Price: </p>
                <p>&#8377;{from === "Cart" ? total : checkoutData?.price}</p>
              </div>
              <div className={check.innerDivs}>
                <p>Delivery: </p>
                <p>&#8377;45</p>
              </div>
              <div className={check.line}></div>
              <div className={check.totalDiv}>
                <p>Order Total: </p>
                <p>
                  &#8377;
                  {from === "Cart" ? total + 45 : checkoutData?.price + 45}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {screenWidth < 786 && <MobileFooter from={"home"} />}
      {screenWidth > 786 && <Footer />}
    </div>
  );
}
