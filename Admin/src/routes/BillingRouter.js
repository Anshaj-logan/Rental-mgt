const express = require('express')
const billingmodel = require('../models/Billingaddress')
const BillingRouter=express.Router()
BillingRouter.use(express.static('./public'))

BillingRouter.get('/billing', function (req, res) {
  res.render('billing')

})

BillingRouter.post('/add-billingaddress', function (req, res) {
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
  billingmodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "billingaddress send"
    })
  })
})

BillingRouter.get('/1Billingaddress', function (req, res) {
  billingmodel.find().then((data)=>{
    res.render('1Billingaddress',{data})    
  })
  })
module.exports = BillingRouter






