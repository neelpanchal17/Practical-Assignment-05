const mongooose = require("mongoose");
const sellerSchema = mongooose.Schema({
    sellerid : String,
    name : String,
    product_ids : [{type:String}]
});
const sellerModel = mongooose.model("seller",sellerSchema,"seller");
module.exports = sellerModel;