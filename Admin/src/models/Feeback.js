const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const feedbackSchema = new schema({
    name:{type:String},
    date:{type:String},
    
    feedback:{type:String},
    
})

const feedbackmodel=mongoose.model('feedback_tb',feedbackSchema)

module.exports=feedbackmodel 
