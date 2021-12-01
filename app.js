const express = require('express')
const app  = express();
app.use(express.json());
const port = 5000;

const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/product");
const sellerRoutes  = require("./routes/seller");

app.get('/',(req,res) => res.send("Hello World!!"));
app.use("/company",companyRoutes);
app.use("/product",productRoutes);
app.use("/seller",sellerRoutes);
app.listen(port,()=>console.log("App Listening On Port Number 5000"));