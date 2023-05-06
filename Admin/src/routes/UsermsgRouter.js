const express = require('express')
const usermsgmodel = require('../models/Usermsg')
const UsermsgRouter=express.Router()
UsermsgRouter.use(express.static('./public'))

UsermsgRouter.get('/usermsgpage', function (req, res) {
    res.render('usermsg')
  
  })

  UsermsgRouter.get('/1Replymsg', function (req, res) {
    res.render('1Replymsg')
  })
  UsermsgRouter.post('/add-usermsg', function (req, res) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      subject: req.body.subject,
      message: req.body.message,
      
  
    }
    usermsgmodel(data).save().then((details) => {
      res.status(200).json({
        success: true,
        error: false,
        data: details,
        message: "Message send"
      })
    })
  })
  module.exports = UsermsgRouter