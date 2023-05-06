const mongoose=require('mongoose')


const schema=mongoose.Schema

const registerDeliverySchema = new schema({
    name:{type:String},
    Email:{type:String},
    Phone:{type:String},
    Place:{type:String},
   District:{type:String},
    Password:{type:String},
    Confirm_Password:{type:String},

})

const registerdeliverymodel=mongoose.model('registerdelivery_tb',registerDeliverySchema)

module.exports=registerdeliverymodel