const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

// THis is the secret key which i can hide from the user
const My_secret = "MyNameIsKhan";

// Create a user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("Name", "Enter your name").isLength({ min: 3 }),
    body("Password", "Enter your password Correctly").isLength({ min: 5 }),
    body("Email", "Enter Valid Email address").isEmail(),
    body("Genders", "Enter Your Genders").isLength({ min: 3 }),
  ],  async (req, res) => {
    // if there are errors, just return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }
    // check whether the user with this email exists already
    try {   
    
      // this part check the email is exist or not 
    let user = await User.findOne({ Email: req.body.Email });
    // console.log(user);
    // if user already exist then this error will be thrown
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.Password, salt);

    // this is the part where the user is created 
    user = await User.create({
      Name: req.body.Name,
      Password: secPass,
      Email: req.body.Email,
      Genders: req.body.Genders,
    });
    // here we can pass the response to the server
    // res.json(user);

    // here we can pass the id to the sarver 
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data, My_secret);
    // console.log(authToken);
    
    // here we can pass the response to the server
    res.json({authToken});

  } catch (error) {
      console.error(error.message);
      res.status(error.statusCode)
  }
  }
);

module.exports = router;
