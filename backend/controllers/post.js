const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req,res)=>{
  try {
    if(req.body.content) {
    const newPostData = {
      content: req.body.content,
      postedBy:req.user._id
    };
    const newPost= await Post.create(newPostData);
    const user= await User.findById(req.user._id);
    user.posts.push(newPost._id)
    await user.save();
    console.log("post uploaded")
    res.send(newPost)
  } else {
    res.status(406).json({msg:"content is required"})
  }
  } catch (error) {
    res.status(500).send(error.message);
  }

};

exports.readPost = async (req,res)=>{
  try {
    const post = await Post.find();
    res.send(post);
  }catch (error) {
    console.log("err")
    res.send(error)
  }
}

exports.updatePost = async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg: "post not found",post})
    }
    if(post.postedBy.toString !== req.user._id.toString){
      return res.status(401).json({msg:"Unauthorized"})
    }
    post.content = req.body.content
    await post.save();
    res.status(200).json({msg: "post updated",post})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

exports.deletePost = async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg: "post not found",post})
    }
    if(post.postedBy.toString !== req.user._id.toString){
      return res.status(401).json({msg:"Unauthorized"})
    }
    await post.remove();
    const user = await User.findById(req.user._id); 
    const index = user.posts.indexOf(req.params._id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({msg: "post deleted",post})
  } catch (error) {
    console.log("err")
    res.status(404).send(error)
  }
}

exports.likeUnlike = async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({msg: "post not found"})
    }
    if(post.likes.includes(req.user._id)){
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({msg: "post unliked",post})
    } 
    else{
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({msg: "post liked",post})
    }
  } catch (error) {
    res.send(error)
  }
};

exports.commentPost = async (req,res)=>{
  try {
    if(req.body.comment) {
      const post = await Post.findById(req.params.id);
      if(!post){
        return res.status(404).json({msg: "post not found"})
      }
      else{
        post.comments.push({user: req.user._id,comment:req.body.comment})
        await post.save();
        return res.status(200).json({msg: "commented on post",post})
      }
    } else {
      res.status(406).json({msg:"comment is required"})
    }

  } catch (error) {
    res.status(404).send(error);
  }
}