
const express = require('express')
const registermodel = require('../models/RegisterUser')
const restoremodel = require('../models/Restore')
const usermsgmodel = require('../models/Usermsg')
const ManageuserRouter=express.Router()
ManageuserRouter.use(express.static('./public'))

ManageuserRouter.get('/1manageuser', function (req, res) {
  registermodel.find().then((data)=>{
    res.render('1manageuser',{data})    
  })
  })


  ManageuserRouter.get('/1restoreuser', async function (req, res) {
    try {
      registermodel.find({Status:"2"}).then((data)=>{
        res.render('1restoreuser',{data})    
      })
      
    } catch (error) {
      
    }
    })

  ManageuserRouter.post('/rejectuser/:id', async function (req, res) {
    const id=req.params.id
    try {
      const res_data=await registermodel.findOne({_id:id})
     
      restoremodel(data_res).save().then((data)=>{
        console.log(id);
            })
      
    } catch (error) {
      
    }
    registermodel.find().then((data)=>{
      res.render('1restoreuser',{data})    
    })
    })


    ManageuserRouter.get('/1usermsg', function (req, res) {
      usermsgmodel.find().then((data)=>{
        res.render('1usermsg',{data})    
      })
      })


  // registermodel.updateOne({_id:id},{$set:{Status:"1"}})






  module.exports=ManageuserRouter