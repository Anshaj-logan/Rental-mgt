const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const loginadminSchema = new schema({
    username:{type:String},
    
    Password:{type:String},
    
})

const loginadminrmodel=mongoose.model('loginadmin_tb',loginadminSchema)

module.exports=loginadminrmodel