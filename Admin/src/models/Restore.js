const mongoose=require('mongoose')


const schema=mongoose.Schema

const restoreSchema = new schema({
    name:{type:String},
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    email:{type:String},
    phone_no:{type:String},
    house_name:{type:String},
    place:{type:String},
    pin:{type:String},
    district:{type:String},
    Status:{type:String},
    
    
})

const restoremodel=mongoose.model('restore_tb',restoreSchema)

module.exports=restoremodel