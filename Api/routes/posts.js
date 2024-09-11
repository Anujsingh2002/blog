const router=require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post");

// create post

router.post('/',async (req,res)=>{
    const newPost= new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

// update post

router.put('/:id',async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try {
                const updatedPost=await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },
                    {
                        new:true
                    }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json('Not authorised to update this post');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//delete post

router.delete('/:id',async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.deleteOne();
                res.status(200).json("post deleted successfully");
            } catch (err) {
                res.status(500).json("hi");
            }
        }else{
            res.status(401).json('Not authorised to delete this post');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get post
router.get('/:id', async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json("User not found!");
    }
})

// get all posts
router.get('/', async(req,res)=>{
    const username=req.query.user;
    const catname=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username:username});
        }else if(catname){
            posts=await Post.find({categories:{
                $in:[catname]
            }

            });
        }
        else{
            posts=await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("User not found!");
    }
})

module.exports=router;