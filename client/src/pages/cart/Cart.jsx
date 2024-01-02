import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cart from "./Cart.module.css";
import Header from "../../components/header/Header";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Footer from "../../components/footer/Footer";
import logo from "../../assets/logo.png";
import bag from "../../assets/bag.svg";
import back from "../../assets/back.svg";
import no_item from "../../assets/cart.png";
import Hero from "../../components/hero/Hero";
import { useNavigate } from "react-router-dom";

function CartProduct({ id, quantity, totalChange }) {
  const [data, setData] = useState({});
  const [formQuantity, setQuantity] = useState(quantity);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`product-for-cart/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const updateLocalCart = (newQuantity) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = localCart.map((item) => {
      return item.productId === id ? { ...item, quantity: newQuantity } : item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  function handleDecrease() {
    if (formQuantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      totalChange(-1 * data.price);
      updateLocalCart(formQuantity - 1);
    }
  }

  function handleIncrease() {
    setQuantity((prevQuantity) => prevQuantity + 1);
    totalChange(data.price);
    updateLocalCart(formQuantity + 1);
  }

  return (
    <div className={cart.cartProduct}>
      {data && (
        <>
          <div className={cart.image_holder}>
            <img className={cart.productCover} src={data.cover} alt="" />
          </div>
          <div className={cart.data_expand}>
            <div className={cart.name}>
              <h3>{data.name}</h3>
              <p>Color: {data.color}</p>
              <p>In Stock</p>
            </div>
            <div className={cart.price}>
              <h3>Price</h3>
              <p>&nbsp;&#8377; {data.price}</p>
            </div>
            <div className={cart.quantity}>
              <h3>Quantity</h3>
              <div>
                <button
                  className={cart.btn}
                  onClick={handleDecrease}
                  disabled={formQuantity === 0}
                >
                  -
                </button>
                <span>{formQuantity}</span>
                <button className={cart.btn} onClick={handleIncrease}>
                  +
                </button>
              </div>
            </div>
            <div className={cart.total}>
              <h3>Total Price</h3>
              <p>
                &nbsp;&#8377;
                {isNaN(data.price) || isNaN(formQuantity)
                  ? "Invalid Price"
                  : data.price * formQuantity}
              </p>
            </div>
          </div>
          <div className={cart.data_short}>
            <div className={cart.name}>
              <p>
                <b> {data.name} </b>| {data.color}
              </p>
            </div>
            <div className={cart.price}>
              <p>
                Price: <b>&nbsp;&#8377; {data.price}</b>
              </p>
            </div>
            <div className={cart.quantity}>
              <p>Quantity:</p>
              <div>
                <button
                  className={cart.btn}
                  onClick={handleDecrease}
                  disabled={formQuantity === 0}
                >
                  -
                </button>
                <p>{formQuantity}</p>
                <button className={cart.btn} onClick={handleIncrease}>
                  +
                </button>
              </div>
            </div>
            <div className={cart.total}>
              <b>
                &nbsp;&#8377;
                {isNaN(data.price) || isNaN(formQuantity)
                  ? "Invalid Price"
                  : data.price * formQuantity}
              </b>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Cart() {
  const { id } = useParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`cart/${id}`);
        const responseCart = response.data.cart;
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartsAreEqual = JSON.stringify(localCart) === JSON.stringify(responseCart);
        if (!cartsAreEqual) {
          localStorage.setItem("cart", JSON.stringify(responseCart));
          setCartData(responseCart);
          const updatedTotalPrice = responseCart.reduce(
            (total, product) => total + product.quantity * product.price,
            0
          );
          setTotalPrice(updatedTotalPrice);
        } else {
          setCartData(localCart);
          const localTotalPrice = localCart.reduce(
            (total, product) => total + product.quantity * product.price,
            0
          );
          setTotalPrice(localTotalPrice);
        }
      } catch (error) {
        console.error(error);
        setTotalPrice(0);
      }
    };

    fetchData();
  }, [id]);

  function changeTotal(productPrice) {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + productPrice);
  }

  return (
    <div className={cart.body}>
      {screenWidth > 786 && <Header />}
      <div className={cart.logo}>
        <img src={logo} alt="logo" />
        <h1>Musicart</h1>
      </div>
      <div className={cart.container}>
        {screenWidth > 786 && <Hero from={"Cart"} />}
        <div className={cart.content}>
          {cartData.length ? (
            <button className={cart.backToHome} onClick={() => navigate("/")}>
              Back To Products
            </button>
          ) : (
            ""
          )}
          {cartData.length ? (
            <button className={cart.backToHome2} onClick={() => navigate("/")}>
              <img src={back} alt="" />
            </button>
          ) : (
            ""
          )}

          <div className={cart.head}>
            <img src={bag} alt="" />
            <h1>My Cart</h1>
          </div>
          {cartData.length ? (
            <div className={cart.cartData}>
              <div className={cart.productSection}>
                {cartData.map((product, index) => (
                  <CartProduct
                    key={index}
                    id={product.productId}
                    quantity={product.quantity}
                    totalChange={changeTotal}
                  />
                ))}
              </div>
              <div className={cart.cartSummary}>
                <h3>PRICE DETAILS</h3>
                <span>
                  <p>Total MRP</p>
                  <p>&nbsp;&#8377; {totalPrice}</p>
                </span>
                <span>
                  <p>Discount on MRP</p>
                  <p>&nbsp;&#8377; 0</p>
                </span>
                <span>
                  <p>Convenience Fees</p>
                  <p>&nbsp;&#8377; 45</p>
                </span>
                <span>
                  <h3>Total Price</h3>
                  <h3>&nbsp;&#8377; {totalPrice <= 0 ? 0 : totalPrice + 45}</h3>
                </span>
                <button className={cart.submit} disabled={totalPrice <= 0} onClick={()=>navigate("/checkout", { state: { from: "Cart" } })}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          ) : (
            <div className={cart.emptyCart}>
              <img src={no_item} alt="no item" style={{height: "8rem", width: "8rem"}}/>
              <h3>Cart is Empty.</h3>
              <button className={cart.backToHome3} onClick={()=>navigate("/")}>EXPLORE PRODUCTS</button>
            </div>
          )}
        </div>
      </div>
      {screenWidth < 786 && <MobileFooter from={"cart"} />}
      {screenWidth > 786 && <Footer />}
    </div>
  );
}
