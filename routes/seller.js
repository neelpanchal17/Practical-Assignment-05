require("dotenv").config();
const express = require('express');
const router = express.Router();
const sellerModel = require("../models/seller");
const mongoose = require("mongoose");
router.use(express.json());
mongoose
.connect(process.env.MONGOURL)
.then(()=>console.log("Mongo DB Connected!"));

//Insert Seller.
router.post("/insert_seller",(req,res)=>{
    const{newseller} = req.body;
    const addseller = sellerModel.create(newseller);
    return res.json({data:"Seller Added!"});
});

//Update Seller's Product.
router.put("/update_seller/update_product/:sname",async(req,res)=>{
    const sname = req.params.sname;
    const product_value = req.body.product_ids;
    const updateproduct = await sellerModel.findOneAndUpdate(
        {name:sname},
        {product_ids:product_value},
        {new:true}
    );
    return res.json({data:"Product Changed!"});
});

//Delete Seller
router.delete("/delete_seller/:sname",async(req,res)=>{
    const sname = req.params.sname;
    const deleteseller = await sellerModel.findOneAndDelete({name:sname});
    return res.json({data:"Seller Deleted!"});
});

//Fetch Seller Details based on Product Name
router.get("/disp_seller_details/:product_name",async(req,res)=>{
    const product_name = req.params.product_name;
    const productModel = require('../models/product');
    const product__name = await productModel.findOne({title:product_name});
    if(product__name == null)
    {
       return res.json({data:"Product Not Found"});
    }
    else
    {
     const sname = await sellerModel.find({product_ids:product__name["productid"]});
     if(sname == null)
     {
        return res.json({data:"Company Not Found"});
     }
     return res.json({data:sname})
    }
});


router.get("/",(req,res) => res.send("For Thr Seller!"));
module.exports = router;