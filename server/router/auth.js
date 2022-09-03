// const { response } = require('express');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');
router.get('/',(req,res)=>
{
    res.send('helo from route');
});
//registration route
router.post('/register',async(req,res)=>
{
    const{name,phone,email,password,cpassword}=req.body;
    if(!name || !phone || !email || !password || !cpassword)
    {
        return res.status(422).json({error:"plz fill all field"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({error:"email aready exist"});
        }
        else if(cpassword != password)
        {
            return res.status(422).json({error:"password not matching"});
        }
        else{
            const user = new User({name,phone,email,password,cpassword});
            const register= await user.save();
            res.status(201).json({message:'sccssful'});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

//login route
router.post('/signin',async(req,res)=>
{
   try{
    let token;
    const{email,password}=req.body;
    if( !email || !password)
    {
        return res.status(422).json({error:"plz fill all field"});
    }
    const userLogin = await User.findOne({email:email});
    if(!userLogin)
    {
        return res.status(400).json({error:"error"});
    }
    else{
    const ismatch = await bcrypt.compare(password,userLogin.password);
     token = await userLogin.generateAuthToken();
    console.log(token);
    res.cookie("jwtwo",token,{
        expires:new Date(Date.now()+ 25892000000),
        httpOnly:true
    });
    if(!ismatch)
    {
        return res.status(400).json({error:"error"});
    }
    else{
        return res.status(400).json({message:"success login"});
    }
    }
   }
   catch(err)
   {
    console.log(err);
   }

});

module.exports=router;