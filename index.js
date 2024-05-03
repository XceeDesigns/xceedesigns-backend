const express = require("express");
const connectDB = require("./db");

const PORT = 3000;

// Connecting to database;
connectDB();

const app = express();


// Routes-01 - no login required
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes-02 - no login required
app.use("/contact", require("./routes/contact"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

