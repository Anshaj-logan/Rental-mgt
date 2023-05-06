const express = require('express')
const registermodel = require('../models/RegisterUser')
const registerdeliverymodel = require('../models/RegisterDelivery')
const RegRouter = express.Router()
RegRouter.use(express.static('./public'))



RegRouter.get('/register', function (req, res) {
  res.render('reg')

})
RegRouter.post('/add-user', function (req, res) {
  const data = {
    F_name: req.body.F_name,
    L_name: req.body.L_name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    House_name: req.body.House_name,
    Place: req.body.Place,
    PIN: req.body.PIN,
    District: req.body.District,
    Password: req.body.Password,
    Confirm_Password: req.body.Confirm_Password,
    Status: "0"

  }
  registermodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "registration completed"
    })
  })
})
RegRouter.get('/approve/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "1"
  }
  registermodel.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1manageuser')

  })
})

RegRouter.get('/reject/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "2"
  }
  registermodel.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1restoreuser')

  })
})
RegRouter.get('/restore/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "0"
  }
  registermodel.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/user/1manageuser')

  })
})

//delivery
RegRouter.get('/registerdelivery', function (req, res) {
  res.render('reg1')

})

RegRouter.post('/add-delivery', function (req, res) {
  const data = {
    name: req.body.name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Place: req.body.Place,
    District: req.body.District,
    Password: req.body.Password,
    Confirm_Password: req.body.Confirm_Password,

    Status: "0"

  }
  registerdeliverymodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "registration completed"
    })
  })
})
RegRouter.get('/approve/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "1"
  }
  registerdeliverymodel.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/delivery/1managedelivery')

  })
})

RegRouter.get('/reject/:id', function (req, res) {
  const id = req.params.id
  const data = {
    Status: "0"
  }
  registerdeliverymodel.updateOne({ _id: id }, { $set: data }).then((data) => {
    res.redirect('/delivery/1managedelivery')

  })
})








module.exports = RegRouter