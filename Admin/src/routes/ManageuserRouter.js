
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


ManageuserRouter.get('/1manageuser', async function (req, res) {
  try {
    const data =await registermodel.aggregate([
      {
        '$lookup': {
          'from': 'login_tbs', 
          'localField': 'login_id', 
          'foreignField': '_id', 
          'as': 'login'
        }
      },
      {
        "$unwind":'$login'
      },
      {
        '$match':{
          'Status':'0'
        }
      },
      {
        "$group":{
          "_id":"$_id",
          "name":{"$first":"$name"},
          "email":{"$first":"$email"},
          "phone_no":{"$first":"$phone_no"},
          "place":{"$first":"$place"},
          "status":{"$first":"$login.status"},
          "login_id":{"$first":"$login._id"},
        }
      }
    ])
// res.json({data})
    res.render('1manageuser',{data}) 
  } catch (error) {
    console.log(error);
  }
})

ManageuserRouter.get('/reject/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "2"
  }
  registermodel.updateOne({ login_id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1restoreuser')

  })
})

ManageuserRouter.get('/restore/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "0"
  }
  registermodel.updateOne({ login_id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1manageuser')

  })
})

ManageuserRouter.get('/delete/:id', function (req, res) {
  const id = req.params.id
 console.log(id);
  registermodel.deleteOne({ login_id: id }).then((data) => {
    loginData.deleteOne({_id:id}).then((datas)=>{
      console.log(datas);
      res.redirect('/user/1manageuser')
    })
 

  })
})
 

ManageuserRouter.get('/approve/:id', function (req, res) {
  const id = req.params.id
  const data = {
    status: "1"
  }
  console.log(data);
  loginData.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1manageuser')

  })
})


  ManageuserRouter.get('/1restoreuser', async function (req, res) {
    try {
      registermodel.find({Status:"2"}).then((data)=>{
        console.log(data);
        res.render('1restoreuser',{data})    
      })
      
    } catch (error) {
      
    }
    })


    

  ManageuserRouter.post('/rejectuser/:id', async function (req, res) {
    const id=req.params.id
    try {
      const res_data=await registermodel.findOne({login_id:id})
     
      restoremodel(res_data).save().then((data)=>{
        restoremodel.find().then((data)=>{
          res.render('1restoreuser',{data})    
        })
            })
      
    } catch (error) {
      
    }
   
    })


    ManageuserRouter.get('/1usermsg', function (req, res) {
      usermsgmodel.find().then((data)=>{
        res.render('1usermsg',{data})    
      })
      })


  // registermodel.updateOne({_id:id},{$set:{Status:"1"}})






  module.exports=ManageuserRouter