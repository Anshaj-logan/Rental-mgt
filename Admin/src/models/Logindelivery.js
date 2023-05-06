const mongoose=require('mongoose')


const schema=mongoose.Schema

const logindeliverySchema = new schema({
    username:{type:String},
    
    Password:{type:String},
    
})

const logindeliverymodel=mongoose.model('logindelivery_tb',logindeliverySchema)

module.exports=logindeliverymodel