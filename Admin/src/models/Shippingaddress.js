const mongoose=require('mongoose')


const schema=mongoose.Schema

const shippingSchema = new schema({
    F_name:{type:String},

    L_name:{type:String},
    Email:{type:String},
    Phone:{type:String},
    Address:{type:String},

    Country:{type:String},
    City:{type:String},
    State:{type:String},
    Pin:{type:String},

    
})

const shippingmodel=mongoose.model('shipping_tb',shippingSchema)

module.exports=shippingmodel