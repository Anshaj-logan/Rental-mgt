const express = require('express')
const productmodel = require('../models/Product')
const productoldmodel = require('../models/ProductOld')
const category = require('../models/CategoryData')
const subcategory = require('../models/SubCategoryData')
const ProductRouter = express.Router()
const multer = require('multer')
ProductRouter.use(express.static('./public'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })



ProductRouter.get('/1Addproduct', async function (req, res) {
  try {
    const categorys = await category.find()
    const sub_category = await subcategory.find()
    res.render('1Addproduct',{categorys,sub_category})
  } catch (error) {
    console.log(error);
  }
 
})



// category section

ProductRouter.get('/add-category', function (req, res) {
  res.render('AddCategory')
})

ProductRouter.get('/save-category', function (req, res) {
  console.log(req.query.category_name);
  const data = {
    category_name: req.query.category_name,
  }
  category(data).save().then((data) => {
    res.redirect('/product/view-category')
  })

})

ProductRouter.get('/view-category', async function (req, res) {
  try {
    const data = await category.find()
    res.render('ViewCategory',{data})
  } catch (error) {
    
  }
 
})


ProductRouter.get('/delete-category/:name', async function (req, res) {
  const id = req.params.name
  try {
    const delete_data = await category.deleteOne({ _id: id })
    if (delete_data.deletedCount == 1) {
      res.redirect('/product/view-category')
    }
  } catch (error) {
console.log(error);
  }
})


// sub category section

ProductRouter.get('/add-sub-category',async function (req, res) {
  try {
    const categorys = await category.find()
    res.render('AddSubCategory',{categorys})
  } catch (error) {
    console.log(error);
  }

})

ProductRouter.get('/view-sub-category', async function (req, res) {
  try {
    const data = await subcategory.aggregate([
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
    res.render('ViewSubCategory',{data})
  } catch (error) {
    
  }
 
})


ProductRouter.get('/delete-sub-category/:name', async function (req, res) {
  const id = req.params.name
  try {
    const delete_data = await subcategory.deleteOne({ _id: id })
    if (delete_data.deletedCount == 1) {
      res.redirect('/product/view-sub-category')
    }
  } catch (error) {
console.log(error);
  }
})


ProductRouter.get('/save-sub-category', function (req, res) {

  const data = {
    category_id:req.query.category_id,
    sub_category_name: req.query.sub_category_name,
  }
  subcategory(data).save().then((data) => {
    res.redirect('/product/view-sub-category')
  })

})

ProductRouter.get('/1AddGallery', async function (req, res) {
  const data = await productmodel.find()
  res.render('1AddGallery', { data })
  console.log(data)
})

ProductRouter.get('/1Products', async function (req, res) {

  try {
    const data = await productmodel.find()
    res.render('1Products', { data })
  } catch (error) {

  }

})


ProductRouter.get('/1ViewGallery', async function (req, res) {

  try {
    const data = await productmodel.find()
    res.render('1ViewGallery', { data })
  } catch (error) {

  }

})


ProductRouter.get('/productviewuser', async function (req, res) {

  try {
    const data = await productmodel.find()
    res.json({ data })
  } catch (error) {

  }

})


//  ProductRouter.get('/New', async function (req, res) {

//     try {
//       const data=await productmodel.find()
//        res.render('New',{data})
//     } catch (error) {

//     }

//   })

ProductRouter.get('/:id', async function (req, res) {
  const id = req.params.id
  try {
    const edit_data = await productmodel.findOne({ _id: id })
    res.render('1Editproduct', { edit_data })
  } catch (error) {

  }

})



ProductRouter.get('/delete/:name', async function (req, res) {
  const id = req.params.name
  try {
    const delete_data = await productmodel.deleteOne({ _id: id })
    if (delete_data.deletedCount == 1) {
      res.redirect('/product/1Products')
    }
  } catch (error) {

  }
})





ProductRouter.post('/save-product', upload.single('img_1'), function (req, res) {
  console.log(req.body);
  const data = {
    category_id: req.body.category_id,
    sub_category_id: req.body.sub_category_id,
    Product_name: req.body.product_name,
    Product_size: req.body.size_available,
    Total_available: req.body.Tot_available,
    Currently_available: req.body.Cur_available,
    Caution: req.body.caution,
    Rental_price: req.body.rental_price,
    Fine: req.body.fine,
    Replacement_Fee: req.body.replacement_fee,
    Product_images: req.file.filename
  }

  productmodel(data).save().then((data) => {
    res.redirect('/product/1Products')
    console.log(data);
  })

})



ProductRouter.post('/save-images', upload.single('img_2'), function (req, res) {
  console.log(req.body);
  const data = {
    Product_name: req.body.product_name,

    Product_images: req.file.filename
  }

  productmodel(data).save().then((data) => {
    res.redirect('/product/1AddGallery')
    console.log(data);
  })

})





ProductRouter.post('/update-product', async function (req, res) {
  console.log("hi");
  const id = req.body._id
  const data = {
    Product_name: req.body.product_name,
    Product_size: req.body.size_available,
    Total_available: req.body.Tot_available,
    Currently_available: req.body.Cur_available,
    Caution: req.body.caution,
    Rental_price: req.body.rental_price,
    Fine: req.body.fine,
    Replacement_Fee: req.body.replacement_fee,
    // Product_images:req.body.img_1
  }
  try {
    const old_data = await productmodel.findOne({ _id: id })
    console.log("da", old_data);

    const dataold = {
      // product_id:old_data._id,
      oldProduct_name: old_data.Product_name,
      oldProduct_size: old_data.Product_size,

      oldTotal_available: old_data.Total_available,
      oldCurrently_available: old_data.Currently_available,
      oldCaution: old_data.Caution,
      oldRental_price: old_data.Rental_price,
      oldFine: old_data.Fine,
      oldReplacement_Fee: old_data.Replacement_Fee,
      oldProduct_images: old_data.Product_images

    }
    console.log("datas", dataold);
    productoldmodel(dataold).save().then((datas) => {
      console.log("datas", datas);
      productmodel.updateOne({ _id: id }, { $set: data }).then((response) => {
        res.redirect('/product/1Products')
      })

    })

  } catch (error) {
    console.log(error);
  }


})


ProductRouter.get('/oldproduct', async function (req, res) {

  try {
    const data = await productoldmodel.find()
    res.render('1oldProduct', { data })
  } catch (error) {

  }

})




module.exports = ProductRouter