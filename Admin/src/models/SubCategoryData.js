const mongoose=require('mongoose')


const schema=mongoose.Schema

const subcategorySchema = new schema({
    category_id:{type:mongoose.Types.ObjectId,ref:"category_tb"},
    sub_category_name:{type:String}
    
})

const subcategory=mongoose.model('sub_category_tb',subcategorySchema)

module.exports=subcategory