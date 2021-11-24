const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("Name", "Enter your name").isLength({ min: 3 }),
    body("Password", "Enter your password Correctly").isLength({ min: 5 }),
    body("Email", "Enter Valid Email address").isEmail(),
    body("Genders", "Enter Your Genders").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // if there are errors, just return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: "Sorry a user with this email address already exists.",
      });
    }
    // check whether the user with this email exists already
    let user = User.findOne({ email: req.body.email });
    if (user.exists()) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email exists" });
    }
    user = await User.create({
      Name: req.body.Name,
      Password: req.body.Password,
      Email: req.body.Email,
      Genders: req.body.Genders,
    });

    // .then((user) => res.json(user))
    // .catch((err) => res.status(err));
  }
);

module.exports = router;
