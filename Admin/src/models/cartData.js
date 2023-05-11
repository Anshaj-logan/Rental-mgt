const mongoose=require('mongoose')


const schema=mongoose.Schema

const cartSchema = new schema({
    Product_id:{type:mongoose.Types.ObjectId,ref:"product_tb"},
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    count:{type:Number},
    status:{type:String},  
})

const cartmodel=mongoose.model('cart_tb',cartSchema)

module.exports=cartmodel