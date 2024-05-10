const express = require("express");
const query = require("express-validator").query;
const { validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const cors = require("cors");
const nodemailer = require('nodemailer');

// Middleware to parse JSON and urlencoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

// Saves data into database
router.post(
  "/",
  [query("email").isEmail(), query("name").isEmpty()],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const { name, email, message } = req.body;
      const newUser = new User({
        name: name,
        email: email,
        message: message,
      });

      try {
        const result = await newUser.save();
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'xceedesigns@gmail.com',
        //       pass: 'juwt nwon efow dqmd'
        //     }
        //   });
          
        //   var mailOptions = {
        //     from: `${email}`,
        //     to: `info@xceedesigns.com`,
        //     subject: `New feedback - ${name}`,
        //     text: `${message}`
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
        res.send(result);
      } catch (error) {
        res.send(error.message);
      }
    } catch (error) {
      res.send(error.message);
    }
  }
);

// Fetch users
router.post("/fetch", async (req, res) => {
  try {
    if (req.body.adminAuth != "@Admin123") {
      res.status(401).send({auth : false});
    } else {
      const users = await User.find();
      res.send(users);
    }
  } catch (error) {
    res.json(error.message);
  }
});

// Delete User Contact
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
