const mongoose=require('mongoose')


const schema=mongoose.Schema

const loginadminSchema = new schema({
    username:{type:String},
    
    Password:{type:String},
    
})

const loginadminrmodel=mongoose.model('loginadmin_tb',loginadminSchema)

module.exports=loginadminrmodel