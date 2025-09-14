const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

router.use(express.json());
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.EMAIL_PASS,   // your app password
      },
    });

    // Mail options
    let mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL, // where you want to receive messages
      subject: `New Contact Us Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
});

module.exports = router;