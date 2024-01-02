const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const userWithEmail = await User.findOne({ email });
    const userWithMobile = await User.findOne({ mobile });
    if (userWithEmail || userWithMobile) {
      return res
        .status(400)
        .json({ msg: "User with this email or mobile already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUser = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id, email }, jwtSecret, {});
    res.cookie("token", token, { sameSite: "none", secure: true });
    res.status(200).json({ id: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { credential, password } = req.body;
  if (!credential || !password) {
    return res
      .status(400)
      .json({ error: "Credential and password are required" });
  }
  try {
    const user = await User.findOne({
      $or: [{ email: credential }, { mobile: credential }],
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credential or password" });
    }
    if( bcrypt.compareSync( password, user.password)){
      const token = jwt.sign({ userId: user._id, credential }, jwtSecret, {});
      res.cookie('token', token, { sameSite: 'none', secure: true });
      res.status(201).json({id: user._id,});
    }else{
      return res.status(401).json({ error: "Invalid credential or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const profile = (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ error: 'Not logged in' });
    }
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        throw err;
      }
      res.json(userData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  res.cookie('token', '', { sameSite: 'none', secure: 'true' }).json('ok');
};

module.exports = { register, login, profile, logout };
