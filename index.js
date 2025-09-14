const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const PORT = 3000;

// Connecting to database;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.use(express.static("public"));
app.use(cors());


// Routes-01 - no login required
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes-02 - no login required
app.use("/contact", require("./routes/contact"));

app.use("/sendmail", require("./routes/sendMail"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

