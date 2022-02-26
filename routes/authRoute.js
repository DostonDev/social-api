const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


//Register
router.post('/register', async (req,res)=>{

    try {

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        //create user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const devUser = await newUser.save()
        //save and return 
        res.status(201).json(devUser)
        console.log("ok");

    }
    catch(err){
        res.status(500).json(err)
        console.log(err);
    }

})


//Login

router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json("user not found")


        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(400).json("wrong pasword")

        res.status(200).json(user)

    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router