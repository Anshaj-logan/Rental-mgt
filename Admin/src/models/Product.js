const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://cvaparna357:cvaparna357@cluster0.vkfvyex.mongodb.net/costume_db?retryWrites=true&w=majority')

const schema=mongoose.Schema

const productSchema = new schema({
    // Login_id:{type:mongoose.Types.ObjectId,ref:"loginadmin_tb"},
    Product_name:{type:String},
    Product_size:{type:String},

    Total_available:{type:String},
    Currently_available:{type:String},
    Caution:{type:String},
    Rental_price:{type:String},
    Fine:{type:String},
    Replacement_Fee:{type:String},
    Product_images:{type:String},
   

})

const productmodel=mongoose.model('product_tb',productSchema)

module.exports=productmodel