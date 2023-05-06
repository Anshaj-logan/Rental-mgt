const express = require('express')
const replycomplaintmodel = require('../models/Replycomplaint')
const complaintmodel = require('../models/Complaint')
const ComplaintRouter=express.Router()
ComplaintRouter.use(express.static('./public'))

ComplaintRouter.get('/complaint', function (req, res) {
  res.render('complaint')

})

ComplaintRouter.post('/add-usercomplaint', function (req, res) {
  const data = {
    name:req.body.name,
    date:req.body.date,
    complaint: req.body.complaint,
    

  }
  complaintmodel(data).save().then((details) => {
    res.status(200).json({
      success: true,
      error: false,
      data: details,
      message: "complaint send"
    })
  })
})

ComplaintRouter.get('/1Complaint', function (req, res) {
  complaintmodel.find().then((data)=>{
    res.render('1Complaint',{data})    
  })
  })



  ComplaintRouter.get('/1Replycomplaint', function (req, res) {
    res.render('1Replycomplaint')
  })
  ComplaintRouter.post('/save-Reply', function (req, res) {
    const data={
      date:req.body.Date,
      subject:req.body.Subject,
      reply:req.body.Reply


    }
    console.log(data);
    replycomplaintmodel(data).save().then((data)=>{
      console.log(data);
     })
  })





  module.exports=ComplaintRouter