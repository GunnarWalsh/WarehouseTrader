const User = require('../models/user.model')
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
    registerUser: async (req,res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email});
            if(potentialUser){
                res.status(400).json({message:"Email has ben used!"})
            }else{
                const newUser= await User.create(req.body);
                const userToken= jwt.sign({_id:newUser._id, email:newUser.email}, secretKey, {expiresIn:'2hr'})
                res.cookie('userToken', userToken, {httpOnly:true, maxAge:7200000}).status(201).json({message: 'User logged in', user:newUser})
            }
        }
        catch(err){
            console.log(err)
            res.status(400).json({error: err})
        }
    },
    login: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email});
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    const userToken= jwt.sign({_id:user._id, email:user.email}, secretKey, {expiresIn:'2hr'})
                    res.cookie('userToken', userToken, {httpOnly:true, maxAge:7200000}).status(201).json({message: 'User logged in', user:user}) 
                }else{
                    res.status(400).json({message: 'Invalid credentials'})
                }
            }else{
                res.status(400).json({message: 'Invalid credentials'})
            }
            
        }
        catch(err){
            res.status(400).json({error:err})
        }
    },
    logout: (req,res) => {
        res.clearCookie('userToken')
        res.sendStatus(200)
        // .json({message: "User is logged out"})
    }
}