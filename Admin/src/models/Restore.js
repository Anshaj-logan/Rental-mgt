const mongoose=require('mongoose')


const schema=mongoose.Schema

const restoreSchema = new schema({
    // Login_id:{type:mongoose.Types.ObjectId,ref:"loginadmin_tb"},
    user_id:{type:mongoose.Types.ObjectId,ref:"product_tb"},
    resF_name:{type:String},
    resL_name:{type:String},
    resEmail:{type:String},
    resPlace:{type:String},
    resPhone:{type:String},
    
    
})

const restoremodel=mongoose.model('restore_tb',restoreSchema)

module.exports=restoremodel