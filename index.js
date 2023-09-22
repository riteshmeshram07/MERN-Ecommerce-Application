const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cors = require("cors")

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors())

// import all routes
const auth = require("./routes/auth");
const products = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", auth);
app.use("/api/v1", products);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

// connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: "dam1tjybp",
    api_key: "259147677741376",
    api_secret: "uCFLk8_fV-W5s_FKbksI3pbn1jo",
});

app.use("/", (req, res) => {
    res.send("App is running.");
});

// Middleware to handle error
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
