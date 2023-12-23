import React, { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import auth from "./SignUp.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const nav = useNavigate();
  const { setId } = useContext(UserContext);

  const handleSignUp = async () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!mobile.trim() || !/^\d+$/.test(mobile) || mobile.length !== 10) {
      errors.mobile = "Valid Mobile number is required";
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Valid Email is required";
    }
    if (!password.trim() || password.length < 4) {
      errors.password = "10 character password is required";
    }
    if (Object.keys(errors).length === 0) {
      try {
        console.log("sending to DB....");
        const response = await axios.post("register", {
          name,
          mobile,
          email,
          password,
        });
        if (response.status === 200) {
          setId(response.data.id);
          nav("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessages({
            ...errorMessages,
            general: error.response.data.msg,
          });
        } else {
          console.log(error);
        }
      }
    } else {
      setErrorMessages(errors);
    }
  };

  return (
    <>
      <div className={auth.body}>
        <div className={auth.content}>
          <div className={auth.logo}>
            <img src={logo} alt="logo" />
            <h1>Musicart</h1>
          </div>
          <div className={auth.wlcm}>Welcome</div>
          <div className={auth.form}>
            <h1>Create an Account</h1>
            <div className={auth.inp}>
              <p style={{ fontWeight: "500" }}>Your Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errorMessages.name && (
                <p className={auth.error}>{errorMessages.name}</p>
              )}
            </div>
            <div className={auth.inp}>
              <p style={{ fontWeight: "500" }}>Mobile Number</p>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errorMessages.mobile && (
                <p className={auth.error}>{errorMessages.mobile}</p>
              )}
            </div>
            <div className={auth.inp}>
              <p style={{ fontWeight: "500" }}>Email Id</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessages.email && (
                <p className={auth.error}>{errorMessages.email}</p>
              )}
            </div>
            <div className={auth.inp}>
              <p style={{ fontWeight: "500" }}>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessages.password && (
                <p className={auth.error}>{errorMessages.password}</p>
              )}
            </div>
            <p>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </p>
            <div className={auth.submit} onClick={handleSignUp}>
              Continue
            </div>
            {errorMessages.general && (
              <p className={auth.error} style={{ marginTop: "10px" }}>
                {errorMessages.general}
              </p>
            )}
            <p>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
          <p>
            Already have an account?{" "}
            <Link to={"/sign-in"} style={{ color: "black" }}>
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
