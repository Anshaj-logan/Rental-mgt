const mongoose=require('mongoose')


const schema=mongoose.Schema

const replycomplaintSchema = new schema({
    date:{type:String},
    subject:{type:String},
    
    reply:{type:String},
    
})

const replycomplaintmodel=mongoose.model('Replycomplaint_tb',replycomplaintSchema)

module.exports=replycomplaintmodel