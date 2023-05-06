const mongoose=require('mongoose')


const schema=mongoose.Schema

const usermsgSchema = new schema({
    // Login_id:{type:mongoose.Types.ObjectId,ref:"loginadmin_tb"},
    name:{type:String},
    email:{type:String},
    date:{type:String},
    email:{type:String},
    subject:{type:String},
    message:{type:String},
    

})

const usermsgmodel=mongoose.model('usermsg_tb',usermsgSchema)

module.exports=usermsgmodel