const express = require('express')
const shippingmodel = require('../models/Shippingaddress')
const ShippingRouter=express.Router()
ShippingRouter.use(express.static('./public'))

ShippingRouter.get('/shipping', function (req, res) {
  res.render('shipping')

})

ShippingRouter.post('/add-shippingaddress', function (req, res) {
  const data = {
   


    F_name: req.body.F_name,
    L_name: req.body.L_name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Address: req.body.Address,
    Country: req.body.Country,
    City: req.body.City,
    State: req.body.State,
    Pin: req.body.Pin,


    

  }
  shippingmodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "shippingaddress send"
    })
  })
})

ShippingRouter.get('/1Shippingaddress', function (req, res) {
    shippingmodel.find().then((data)=>{
    res.render('1Shippingaddress',{data})    
  })
  })
module.exports = ShippingRouter






