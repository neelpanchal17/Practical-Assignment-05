require("dotenv").config();
const express = require('express');
const companyModel = require('../models/company');
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("Mongo DB Connected!"));
router.get('/',(req,res) => res.send("For The Company!"));

//Insert Company
router.post("/insert_company",(req,res)=>{
    const{newcompany} = req.body;
    const addcompany = companyModel.create(newcompany);
    return res.json({data:"Company Added!"});
});

//Update Company's Product
router.put("/update_company/update_product/:cname",async(req,res)=>{
    const cname = req.params.cname;
    const product_value = req.body.product_ids;
    const updateproduct = await companyModel.findOneAndUpdate(
        {companyname : cname},
        {product_ids : product_value},
        {new : true}
    );
    return res.json({data:"product Changed!"});
});

//Delete Company
router.delete("/delete_company/:cname",async(req,res)=>{
    const cname = req.params.cname;
    const deletecompany = await companyModel.findOneAndDelete({companyname:cname});
    return res.json({data:"Company Deleted!"});
});

//Fetch Company Details Based On Product Name
router.get("/disp_company_details/:product_name",async(req,res)=>{
    const product_name = req.params.product_name;
    const productModel = require('../models/product');
    const product__name = await productModel.findOne({title:product_name});
    if(product__name == null)
    {
       return res.json({data:"Product Not Found"});
    }
    else
    {
     const cname = await companyModel.find({product_ids:product__name["productid"]});
     if(cname == null)
     {
        return res.json({data:"Company Not Found"});
     }
     return res.json({data:cname})
    }
});
module.exports = router;