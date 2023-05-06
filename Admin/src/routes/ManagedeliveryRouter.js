
const express = require('express')
const registerdeliverymodel = require('../models/RegisterDelivery')
const ManagedeliveryRouter=express.Router()
ManagedeliveryRouter.use(express.static('./public'))


ManagedeliveryRouter.get('/1managedelivery', function (req, res) {
  
  registerdeliverymodel.find().then((data)=>{
    res.render('1managedelivery',{data})    
  })
  })

  ManagedeliveryRouter.get('/1restoredelivery', function (req, res) {
  
    registerdeliverymodel.find().then((data)=>{
      res.render('1restoredelivery',{data})    
    })
    })
  





  module.exports=ManagedeliveryRouter