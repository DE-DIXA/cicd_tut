// const { response } = require('express');
const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');
router.get('/',(req,res)=>
{
    res.send('helo from route');
});
router.post('/register',(req,res)=>
{
    // console.log(req.body);
    // console.log(req.body.name);
    // res.json({message:req.body})
    // res.send('helo from route');

    const{name,phone,email,password}=req.body;
    if(!name || !phone || !email || !password)
    {
        return res.status(422).json({error:"plz fill all field"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist)
        {
            return res.status(422).json({error:"email aready exist"});
        }
        const user = new User({name,phone,email,password});

        user.save().then(()=>
        {
            res.status(201).json({message:'sccssful'});
            }).catch((err)=> res.status(500).json({error: "fail"})
            );
     
    }).catch(err =>{console.log(err)});

});
module.exports=router;