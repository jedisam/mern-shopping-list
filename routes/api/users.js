const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
// Users model
const User = require("../../model/User");

router.get("/", (req, res) => {
  console.log(process.env.jwtSecret);
});

// add new user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check for existing user

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    // create slat & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
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
  });
});

// Delete item

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  User.findOne(query, (err, list) => {
    if (err) {
      res.status(404).json("list not found");
    } else {
      List.deleteOne(query).then(res.json(list));
    }
  });
});

module.exports = router;
