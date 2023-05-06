const express = require('express')
const bcrypt = require('bcryptjs')
const Reg = require('../../models/RegisterUser')
const login = require('../../models/Loginuser')



const registerRouter = express.Router()


registerRouter.post('/', async (req,res) => {
    try{
        const userExists = await login.findOne({username: req.body.username })
        
        
        if(userExists){
            return res.status(400).json({ success:false,error:true, message: 'user already registered'})
        }        
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password,12)

        const oldPhone = await Reg.findOne({ phone_no: req.body.phone_no }) 
        if(oldPhone){
            return res.status(400).json({ success:false,error:true, message: 'phone number already exists '}) 
        } 
        const oldEmail = await Reg.findOne({ email: req.body.email }) 
        if(oldEmail){
            return res.status(400).json({ success:false,error:true, message: 'email already exists '}) 
        }  
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 1,
            status: 0,
        }
        
        const result = await login(log).save()
        var reg = {
            login_id:result._id,
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            house_name:req.body.house_name,
            place: req.body.place,
            pin:req.body.pin,
            district: req.body.district,
            
            
            
        }
        
        const result2 = await Reg(reg).save()
        res.status(201).json({
            success:true,error:false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({success:false,error:true, message: 'Something Went Wrong'})
        console.log(err)
    }
})

module.exports = registerRouter

