const mongoose=require('mongoose')


const schema=mongoose.Schema

const productSchema = new schema({
    category_id:{type:mongoose.Types.ObjectId,ref:"category_tb"},
    sub_category_id:{type:mongoose.Types.ObjectId,ref:"sub_category_tb"},
    Product_name:{type:String},
    Product_size:{type:String},
    Total_available:{type:Number},
    Currently_available:{type:String},
    Caution:{type:Number},
    Rental_price:{type:Number},
    Fine:{type:Number},
    Replacement_Fee:{type:Number},
    Product_images:{type:String},
   

})

const productmodel=mongoose.model('product_tb',productSchema)

module.exports=productmodel