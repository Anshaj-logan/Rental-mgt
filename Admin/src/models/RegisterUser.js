const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const registerSchema = new schema({
    F_name:{type:String},
    L_name:{type:String},
    Email:{type:String},
    Phone:{type:String},
    House_name:{type:String},
    Place:{type:String},
    PIN:{type:String},
    District:{type:String},
    Password:{type:String},
    Confirm_Password:{type:String},
    Status:{type:String},

})

const registermodel=mongoose.model('registeruser_tb',registerSchema)

module.exports=registermodel