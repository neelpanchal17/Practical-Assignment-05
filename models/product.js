const mongooose = require("mongoose");
const productSchema = mongooose.Schema({
    productid : String,
    title : String,
    price : String,
    category : [{type:String}],
    companyid: String,
    sellerid : String
});
const productModel = mongooose.model("product",productSchema,"product");
module.exports = productModel;