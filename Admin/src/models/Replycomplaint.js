const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const replycomplaintSchema = new schema({
    date:{type:String},
    subject:{type:String},
    
    reply:{type:String},
    
})

const replycomplaintmodel=mongoose.model('Replycomplaint_tb',replycomplaintSchema)

module.exports=replycomplaintmodel