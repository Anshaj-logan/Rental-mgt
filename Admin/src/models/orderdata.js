const mongoose=require('mongoose')


const schema=mongoose.Schema

const orderSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    amount:{type:Number},
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type:String},
    country:{type:String},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    pin:{type:String},
    status:{type:String},  
})

const ordermodel=mongoose.model('order_tb',orderSchema)

module.exports=ordermodel