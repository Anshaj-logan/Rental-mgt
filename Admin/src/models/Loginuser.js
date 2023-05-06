const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const loginuserSchema = new schema({
    username:{type:String},
    
    Password:{type:String},
    
})

const loginusermodel=mongoose.model('loginuser_tb',loginuserSchema)

module.exports=loginusermodel