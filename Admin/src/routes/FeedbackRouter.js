const express = require('express')
const feedbackmodel = require('../models/Feeback')
const FeedbackRouter=express.Router()
FeedbackRouter.use(express.static('./public'))

FeedbackRouter.get('/feedback', function (req, res) {
  res.render('feedback')

})

FeedbackRouter.post('/add-userfeedback', function (req, res) {
  const data = {
    name: req.body.name,
    date: req.body.date,
    feedback: req.body.feedback,
    

  }
  feedbackmodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "feedback send"
    })
  })
})

FeedbackRouter.get('/1feedback', function (req, res) {
  feedbackmodel.find().then((data)=>{
    res.render('1feedback',{data})    
  })
  })
module.exports = FeedbackRouter






