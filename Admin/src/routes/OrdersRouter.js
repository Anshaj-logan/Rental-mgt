const express = require('express')
const OrdersRouter=express.Router()
OrdersRouter.use(express.static('./public'))


OrdersRouter.get('/1Orders', function (req, res) {
    res.render('1Orders')
  })
  OrdersRouter.get('/viewproduct',function(req,res){
    res.render('1viewproduct')
  })
  




  module.exports=OrdersRouter