const express = require('express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const category = require('../../models/CategoryData')
const subcategory = require('../../models/SubCategoryData')
const product = require('../../models/Product')
const cart = require('../../models/cartData')
const order = require('../../models/orderdata')
const productRouter = express.Router()

productRouter.post('/add-order', async (req, res) => {
  try {
 
    var data = {
      login_id: req.body.login_id,
      amount: req.body.amount,
      status: 0,
    }
    
    const result = await order(data).save()
    if (result) {
      const cart_data = await cart.updateOne({login_id:req.body.login_id},{$set:{status:1}})
      if(cart_data.matchedCount===1){
        res.status(201).json({
          success: true, error: false,
          result: result,
          message: 'Added'
        })
      }
     
    }


  }
  catch (err) {
    res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
    console.log(err)
  }
})

productRouter.get("/delete-cart/:id", async (req, res) => {
  try {
    const id = req.params.id
    const allData = await cart.deleteOne({_id:id})
    if (allData.deletedCount===1) {
      return res.status(200).json({ success: true, error: false, message: "cart item deleted" });
    }
    else {
      res.status(201).json({ success: false, error: true, message: "No data found" });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: true, message: "Something went wrong" });
  }
});

productRouter.get('/quantity-add-cart/:id', async (req, res) => {
  try {
    const id = req.params.id
    const old = await cart.findOne({ _id: id })
    const counts = old.count + 1

    const add = await cart.updateOne({ _id: id }, { $set: { count: counts } })

    if (add.modifiedCount === 1) {
      const old_product = await product.findOne({ _id: old.Product_id })
      const available_counts = old_product.Total_available - 1
      const products = await product.updateOne({ _id: old.Product_id }, { $set: { Total_available: available_counts } })

      return res.status(201).json({
        success: true, error: false,
        message: "updated"
      })
    } else {
      return res.status(400).json({
        success: false, error: true,
        message: "error"
      })
    }
  }
  catch (err) {
    res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
    console.log(err)
  }
})

productRouter.get('/quantity-minus-cart/:id', async (req, res) => {
  try {
    const id = req.params.id
    const old = await cart.findOne({ _id: id })
    const counts = old.count - 1

    const add = await cart.updateOne({ _id: id }, { $set: { count: counts } })

    if (add.modifiedCount === 1) {
      const old_product = await product.findOne({ _id: old.Product_id })
      const available_counts = old_product.Total_available + 1
      const products = await product.updateOne({ _id: old.Product_id }, { $set: { Total_available: available_counts } })

      return res.status(201).json({
        success: true, error: false,
        message: "updated"
      })
    } else {
      return res.status(400).json({
        success: false, error: true,
        message: "error"
      })
    }
  }
  catch (err) {
    res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
    console.log(err)
  }
})

productRouter.get('/view-cart/:id', async (req, res) => {
  try {
    const id = req.params.id
    console.log("hi");
    const carts = await cart.aggregate([
      {
        '$lookup': {
          'from': 'product_tbs',
          'localField': 'Product_id',
          'foreignField': '_id',
          'as': 'product'
        },
      },
      {
        '$lookup': {
          'from': 'registeruser_tbs',
          'localField': 'login_id',
          'foreignField': 'login_id',
          'as': 'user'
        }
      },
      {
        "$unwind": '$product'
      },
      {
        "$unwind": '$user'
      },
      {
        "$match": {
          'login_id': new objectId(id)
        }
      },
      {
        "$group": {
          "_id": "$_id",
          "Product__id": { "$first": "$product._id" },
          "Product_name": { "$first": "$product.Product_name" },
          "Product_size": { "$first": "$product.Product_size" },
          "Total_available": { "$first": "$product.Total_available" },
          "Rental_price": { "$first": "$product.Rental_price" },
          "Product_images": { "$first": "$product.Product_images" },
          "Caution": { "$first": "$product.Caution" },
          "Rental_price": { "$first": "$product.Rental_price" },
          "login_id": { "$first": "$user.login_id" },
          "count": { "$first": "$count" },
          "status": { "$first": "$status" },
        }
      }
    ])

    carts.forEach((item) => {
      item.total = item.Caution * item.count;
    });

    if (carts) {
      res.status(201).json({
        success: true, error: false,
        data: carts
      })
    } else {
      res.status(201).json({
        success: true, error: false,
        data: []
      })
    }


  }
  catch (err) {
    res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
    console.log(err)
  }
})

productRouter.post('/add-cart', async (req, res) => {
  try {
    const Exists = await cart.findOne({ login_id: req.body.login_id, Product_id: req.body.product_id })


    if (Exists) {
      return res.status(400).json({ success: false, error: true, message: 'Product already in cart' })
    }

    var data = {
      Product_id: req.body.product_id,
      login_id: req.body.login_id,
      count: req.body.count,
      status: 0,
    }
    console.log(data);
    const result = await cart(data).save()
    if (result) {
      res.status(201).json({
        success: true, error: false,
        result: result,
        message: 'Added'
      })
    }


  }
  catch (err) {
    res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
    console.log(err)
  }
})

productRouter.get("/view-products", async (req, res) => {
  try {
    const allData = await product.aggregate([
      {
        '$lookup': {
          'from': 'category_tbs',
          'localField': 'category_id',
          'foreignField': '_id',
          'as': 'category'
        }
      }, {
        '$lookup': {
          'from': 'sub_category_tbs',
          'localField': 'sub_category_id',
          'foreignField': '_id',
          'as': 'sub'
        }
      },
      {
        "$unwind": '$category'
      },
      {
        "$unwind": '$sub'
      },
      {
        "$group": {
          "_id": "$_id",
          "category_name": { "$first": "$category.category_name" },
          "sub_category_name": { "$first": "$sub.sub_category_name" },
          "Product_name": { "$first": "$Product_name" },
          "Product_size": { "$first": "$Product_size" },
          "Total_available": { "$first": "$Total_available" },
          "Rental_price": { "$first": "$Rental_price" },
          "Product_images": { "$first": "$Product_images" },
          "Caution": { "$first": "$Caution" },
        }
      }
    ])
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

productRouter.get("/view-single-products/:id", async (req, res) => {
  try {
    const id = req.params.id
    const allData = await product.aggregate([
      {
        '$lookup': {
          'from': 'category_tbs',
          'localField': 'category_id',
          'foreignField': '_id',
          'as': 'category'
        }
      }, {
        '$lookup': {
          'from': 'sub_category_tbs',
          'localField': 'sub_category_id',
          'foreignField': '_id',
          'as': 'sub'
        }
      },
      {
        "$unwind": '$category'
      },
      {
        "$unwind": '$sub'
      },
      {
        "$match": {
          '_id': new objectId(id)
        }
      },
      {
        "$group": {
          "_id": "$_id",
          "category_name": { "$first": "$category.category_name" },
          "sub_category_name": { "$first": "$sub.sub_category_name" },
          "Product_name": { "$first": "$Product_name" },
          "Product_size": { "$first": "$Product_size" },
          "Total_available": { "$first": "$Total_available" },
          "Rental_price": { "$first": "$Rental_price" },
          "Product_images": { "$first": "$Product_images" },
        }
      }
    ])
    if (allData) {
      return res.status(200).json({ success: true, error: false, data: allData[0] });
    }
    else {
      res.status(201).json({ success: false, error: true, message: "No data found" });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: true, message: "Something went wrong" });
  }
});

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
        "$unwind": "$category"
      },

      {
        "$group": {
          "_id": "$_id",
          "category_name": { "$first": "$category.category_name" },
          "sub_category_name": { "$first": "$sub_category_name" },
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