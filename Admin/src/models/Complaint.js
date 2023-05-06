const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const complaintSchema = new schema({
    name:{type:String},

    date:{type:String},
    complaint:{type:String},
    
})

const complaintmodel=mongoose.model('complaint_tb',complaintSchema)

module.exports=complaintmodel