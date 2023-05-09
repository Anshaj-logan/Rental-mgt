
const express = require('express')
const registermodel = require('../models/RegisterUser')
const restoremodel = require('../models/Restore')
const usermsgmodel = require('../models/Usermsg')
const loginData = require('../models/Loginuser')
const bcrypt = require('bcryptjs')
const ManageuserRouter=express.Router()
ManageuserRouter.use(express.static('./public'))

ManageuserRouter.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  try {
    const oldUser = await loginData.findOne({ username })
    console.log(oldUser);
    if (!oldUser) return res.redirect('/admin')
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    console.log("user", isPasswordCorrect);

    if (!isPasswordCorrect) return res.redirect('/admin')

    if (oldUser.role === '0') {
            const admin = await loginData.findOne({ _id: oldUser._id })
            if (admin) {
                return res.redirect('/dashboard')
            }           
    }       
  } catch (error) {
      return res.status(500).redirect('/admin')
  }
})


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