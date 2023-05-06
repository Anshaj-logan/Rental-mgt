const mongoose=require('mongoose')


const schema=mongoose.Schema

const billingSchema = new schema({
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

const billingmodel=mongoose.model('billing_tb',billingSchema)

module.exports=billingmodel