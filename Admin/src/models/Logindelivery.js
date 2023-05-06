const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const logindeliverySchema = new schema({
    username:{type:String},
    
    Password:{type:String},
    
})

const logindeliverymodel=mongoose.model('logindelivery_tb',logindeliverySchema)

module.exports=logindeliverymodel