const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');
require("dotenv/config");
// Users model
const User = require("../../model/User");

router.get("/", (req, res) => {
  console.log(process.env.jwtSecret);
});

// authenticate user // /api/auth
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check for existing user

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User Does not exists" });
    }
    // Compare password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid Credentials!" });
      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// get user data /private
///api/auth/user
router.get('/user',auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;
