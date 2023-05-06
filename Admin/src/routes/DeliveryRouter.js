const express = require('express')
const DeliveryRouter=express.Router()
DeliveryRouter.use(express.static('./public'))


DeliveryRouter.get('/1deliverystatus', function (req, res) {
    res.render('1deliverystatus')
  })





  module.exports=DeliveryRouter