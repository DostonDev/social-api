const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// update user

router.put('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)

            }
            catch(err){
                res.status(500).json(err)
            }
        }
        try {
            const devUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            })
            res.status(200).json("has been updated")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("update account ")
    }
})

// delete

router.delete("/:id", async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            const devUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("delete user")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("delete accaunt")
    }
})

// get

router.get("/:id", async (req,res)=>{
    try{
        const devUser = await User.findById(req.params.id)
        const {password,...other} = devUser._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }

})




// update follow


router.put("/follow/:id", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const devUser = await User.findById(req.params.id)
            const devUser_follow = await User.findById(req.body.userId)
            if(!devUser.followers.includes(req.body.userId)){
                await devUser.updateOne({$push:{followers:req.body.userId}})
                await devUser_follow.updateOne({$push:{following:req.params.id}})
                res.status(200).json("user has been followed")
            }
            else{
                res.status(403).json("you already follow this user")
            }

        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(500).json("you can not followed yourself")
    }
})


// update unfollow

router.put("/unfollow/:id", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const devUser = await User.findById(req.params.id)
            const devUser_follow = await User.findById(req.body.userId)
            if(devUser.followers.includes(req.body.userId)){
                await devUser.updateOne({$pull:{followers:req.body.userId}})
                await devUser_follow.updateOne({$pull:{following:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }
            else{
                res.status(403).json("you already unfollow this user")
            }

        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(500).json("you can not unfollowed yourself")
    }
})

module.exports = router