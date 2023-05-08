const express = require('express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const category = require('../../models/CategoryData')
const subcategory = require('../../models/SubCategoryData')
const productRouter = express.Router()


productRouter.get("/view-category", async (req, res) => {
    try {
        const allData = await category.find()
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});


productRouter.get("/view-sub-category/", async (req, res) => {
    try {
      
        const allData = await subcategory.aggregate([
            {
              '$lookup': {
                'from': 'category_tbs', 
                'localField': 'category_id', 
                'foreignField': '_id', 
                'as': 'category'
              }
            },
            {
              "$unwind":"$category"
            },
            
            {
              "$group":{
                "_id":"$_id",
                "category_name":{"$first":"$category.category_name"},
                "sub_category_name":{"$first":"$sub_category_name"},
              }
            }
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: true, error: false, data: [] });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});





module.exports = productRouter