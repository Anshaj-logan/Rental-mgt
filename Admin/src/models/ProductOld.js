const mongoose=require('mongoose')


const schema=mongoose.Schema

const productoldSchema = new schema({
    // Login_id:{type:mongoose.Types.ObjectId,ref:"loginadmin_tb"},
    Product_id:{type:mongoose.Types.ObjectId,ref:"product_tb"},
    oldProduct_name:{type:String},
    oldProduct_size:{type:String},
    oldTotal_available:{type:String},
    oldCurrently_available:{type:String},
    oldCaution:{type:String},
    oldRental_price:{type:String},
    oldFine:{type:String},
    oldReplacement_Fee:{type:String},
    oldProduct_images:{type:String},
   

})

const productoldmodel=mongoose.model('productold_tb',productoldSchema)

module.exports=productoldmodel