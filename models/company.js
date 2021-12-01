const mongooose = require("mongoose");
const companySchema = mongooose.Schema({
    companyid : String,
    companyname : String,
    product_ids : [{type:String}]
});
const companyModel = mongooose.model("company",companySchema,"company");
module.exports = companyModel;