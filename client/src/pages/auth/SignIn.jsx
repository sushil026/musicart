import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import auth from "./SignIn.module.css";
import logo from "../../assets/logo.png";
import { UserContext } from "../../contexts/UserContext";

export default function SignIn() {
  const [credential, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const nav = useNavigate();
  const { setId } = useContext(UserContext);

  const handleSignIn = async () => {
    const errors = {};
    if (!credential.trim()) {
      errors.credential = "Please enter your email or mobile number";
    }
    if (!password.trim()) {
      errors.password = "Please enter your password";
    }
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("login", { credential, password });
        setId( response.data.id );
        nav("/");
      } catch (error) {
        if (error.response) {
          setErrorMessages({
            ...errorMessages,
            general: error.response.data.error,
          });
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
            <h1>Sign in</h1>
            <div className={auth.inp}>
              <p style={{ fontWeight: "500" }}>
                Enter your email or mobile number
              </p>
              <input
                type="text"
                value={credential}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessages.credential && (
                <p className={auth.error}>{errorMessages.credential}</p>
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
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
            {errorMessages.general && (
              <p className={auth.error} style={{ marginTop: "10px" }}>
                {errorMessages.general}
              </p>
            )}
            <div className={auth.submit} onClick={handleSignIn}>
              Continue
            </div>
          </div>
          <p className={auth.ask}>New to Musicart?</p>
          <Link to={"/sign-up"} className={auth.switchToSignup}>
            <div>
              <p>Create your Musicart account</p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
