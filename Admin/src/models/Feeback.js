const mongoose=require('mongoose')


const schema=mongoose.Schema

const feedbackSchema = new schema({
    name:{type:String},
    date:{type:String},
    
    feedback:{type:String},
    
})

const feedbackmodel=mongoose.model('feedback_tb',feedbackSchema)

module.exports=feedbackmodel 
