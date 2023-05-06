const express = require('express')
const productmodel = require('../models/Product')
const productoldmodel = require('../models/ProductOld')
const ProductRouter = express.Router()
const multer  = require('multer')
ProductRouter.use(express.static('./public'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })



ProductRouter.get('/1Addproduct', function (req, res) {
    res.render('1Addproduct')
  })

  ProductRouter.get('/1AddGallery',async function (req, res) {
    const data=await productmodel.find()
    res.render('1AddGallery',{data})
    console.log(data)
  })

  ProductRouter.get('/1Products', async function (req, res) {
    
    try {
      const data=await productmodel.find()
      res.render('1Products',{data})
    } catch (error) {
      
    }
    
  })


  ProductRouter.get('/1ViewGallery', async function (req, res) {
    
    try {
      const data=await productmodel.find()
      res.render('1ViewGallery',{data})
    } catch (error) {
      
    }
    
  })


  ProductRouter.get('/productviewuser', async function (req, res) {
    
    try {
      const data=await productmodel.find()
      res.json({data})
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
  const id=req.params.id
  try {
    const edit_data=await productmodel.findOne({_id:id})
    res.render('1Editproduct',{edit_data})
  } catch (error) {
   
  }

})



  ProductRouter.get('/delete/:name',async function(req,res)
  {
    const id=req.params.name
    try {
      const delete_data=await productmodel.deleteOne({_id:id})
      if (delete_data.deletedCount==1)
      {
        res.redirect('/product/1Products')
      }
    } catch (error) {
      
    }
  })





  ProductRouter.post('/save-product',upload.single('img_1') ,function (req, res) {
    console.log(req.body);
   const data = {
    Product_name:req.body.product_name,
    Product_size:req.body.size_available,

    Total_available:req.body.Tot_available,
    Currently_available:req.body.Cur_available,
    Caution:req.body.caution,
    Rental_price:req.body.rental_price,
    Fine:req.body.fine,
    Replacement_Fee:req.body.replacement_fee,
    Product_images:req.file.filename
   }

   productmodel(data).save().then((data)=>{
    res.redirect('/product/1Products')
    console.log(data);
   })
   
  })



  ProductRouter.post('/save-images',upload.single('img_2') ,function (req, res) {
    console.log(req.body);
   const data = {
    Product_name:req.body.product_name,
    
    Product_images:req.file.filename
   }

   productmodel(data).save().then((data)=>{
    res.redirect('/product/1AddGallery')
    console.log(data);
   })
   
  })





  ProductRouter.post('/update-product',async function (req, res) {
  console.log("hi");
    const id = req.body._id
   const data = {
    Product_name:req.body.product_name,
    Product_size:req.body.size_available,
    Total_available:req.body.Tot_available,
    Currently_available:req.body.Cur_available,
    Caution:req.body.caution,
    Rental_price:req.body.rental_price,
    Fine:req.body.fine,
    Replacement_Fee:req.body.replacement_fee,
    // Product_images:req.body.img_1
   }
   try {
    const old_data=await productmodel.findOne({_id:id})
 console.log("da",old_data);

    const dataold={
      // product_id:old_data._id,
    oldProduct_name:old_data.Product_name,
    oldProduct_size:old_data.Product_size,

    oldTotal_available:old_data.Total_available,
    oldCurrently_available:old_data.Currently_available,
    oldCaution:old_data.Caution,
    oldRental_price:old_data.Rental_price,
    oldFine:old_data.Fine,
    oldReplacement_Fee:old_data.Replacement_Fee,
    oldProduct_images:old_data.Product_images

    }
    console.log("datas",dataold);
    productoldmodel(dataold).save().then((datas)=>{
      console.log("datas",datas);
      productmodel.updateOne({_id:id},{$set:data}).then((response)=>{
        res.redirect('/product/1Products')
      })
      
    })
    
   } catch (error) {
    console.log(error);
   }
   
   
   })
   
 
  ProductRouter.get('/oldproduct', async function (req, res) {
    
    try {
      const data=await productoldmodel.find()
      res.render('1oldProduct',{data})
    } catch (error) {
      
    }
    
  })

  
 

module.exports = ProductRouter