const express = require('express')
const PaymentRouter=express.Router()
PaymentRouter.use(express.static('./public'))

PaymentRouter.get('/1payment', function (req, res) {
    res.render('1payment')
  })





  module.exports=PaymentRouter