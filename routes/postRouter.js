const router = require('express').Router()
const Post = require('../models/postModel')

//Create Post

router.post('/', async (req,res)=>{

    const newPost = new Post(req.body)
    try{
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    }
    catch(err){
        res.status(500).json(err)
        console.log(err);
    }
})

// update post
router.put('/:id', async (req,res)=>{
    try{
        const devPost = await Post.findById(req.params.id)
        if(devPost.userId === req.body.userId){
            await devPost.updateOne({$set:req.body})
            res.status(200).json("update")
        }
        else{
            res.status(403).json("not your accaount")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
} )

// delete post 

router.delete('/:id', async (req,res)=>{
    try{
        const devPost = await Post.findById(req.params.id)
        if(devPost.userId === req.body.userId){
            await devPost.deleteOne()
            res.status(200).json("delete")
        }
        else{
            res.status(403).json("not your accaount")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
} )


// like dislike 

router.put('/like/:id', async (req,res)=>{
    try{
        const devPost = await Post.findById(req.params.id)
        if(!devPost.likes.includes(req.body.userId)){
            await devPost.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("liked")
        }
        else{
            await devPost.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("dislike")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router