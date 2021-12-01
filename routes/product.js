require("dotenv").config();
const express = require('express');
const productModel = require("../models/product");
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());
mongoose
.connect(process.env.MONGOURL)
.then(()=> console.log("Mongo Db Connected!"));
router.get("/",(req,res) => res.send("For The Product!!"));

//Insert Product.
router.post("/insert_product",(req,res)=>{
    const{newproduct} = req.body;
    const addproduct = productModel.create(newproduct);
    return res.json({data:"Product Added!"});
});

//Update Product's Category.
router.put("/update_product/update_category/:pname",async(req,res)=>{
    const pname = req.params.pname;
    const category_value = req.body.category;
    const updatecategory = await productModel.findOneAndUpdate(
      {title:pname},
      {category:category_value},
      {new:true}
    );
    return res.json({data:"Category Changed!"});
});

//Delete Product.
router.delete("/delete_product/:pname",async(req,res)=>{
    const pname = req.params.pname;
    const delete_product = await productModel.findOneAndDelete({title:pname});
    return res.json({data:"Product Deleted!"});
});

//Fetch All Product Of a Seller.
router.get("/disp_product_details/product_of_seller/:sname",async(req,res)=>{
    const sname = req.params.sname;
    const sellerModel = require('../models/seller');
    const seller_name = await sellerModel.findOne({name:sname});
    if(seller_name == null)
    {
       return res.json({data:"Seller Not Found"});
    }
    else
    {
     const pname = await productModel.find({productid:seller_name["product_ids"]});
     if(pname == null)
     {
        return res.json({data:"Product Not Found"});
     }
     return res.json({data:pname})
    }
});














//Fetch All Product Of a Company.
router.get("/disp_product_details/product_of_company/:cname",async(req,res)=>{
    const cname = req.params.cname;
    const companyModel = require('../models/company');
    const company_name = await companyModel.findOne({companyname:cname});
    if(company_name == null)
    {
       return res.json({data:"Company Not Found"});
    }
    else
    {
     const pname = await productModel.find({productid:company_name["product_ids"]});
     if(pname == null)
     {
        return res.json({data:"Product Not Found"});
     }
     return res.json({data:pname})
    }
});






















module.exports = router;
