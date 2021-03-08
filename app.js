require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

const port = process.env.PORT || 4040;

mongoose.connect(
    process.env.DB,{
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    () => console.log("DB connection established")
)

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");

app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use("/category", categoryRoute);
app.use("/product", productRoute);


app.listen(port, () => {
    console.log(`Node server is listening on  http://localhost:${port}`);
});