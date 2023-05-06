const mongoose=require('mongoose')


const schema=mongoose.Schema

const complaintSchema = new schema({
    name:{type:String},

    date:{type:String},
    complaint:{type:String},
    
})

const complaintmodel=mongoose.model('complaint_tb',complaintSchema)

module.exports=complaintmodel