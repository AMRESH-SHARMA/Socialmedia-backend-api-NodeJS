const Post = require("../models/Post");
const User = require("../models/User");
const path = require('path');
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const cloudinaryUpload = file => cloudinary.uploader.upload(file);
const formatBufferTo64 = file => parser.format(path.extname(file.originalname).toString(), file.buffer)


exports.createPost = async (req, res) => {
  try {

    if (req.file && req.body.content) {
      const file64 = formatBufferTo64(req.file);
      const uploadResult = await cloudinaryUpload(file64.content);

      const newPostData = {
        content: req.body.content,
        imgUrl: uploadResult.secure_url,
        postedBy: req.user._id
      };

      const newPost = await Post.create(newPostData);
      const user = await User.findById(req.user._id);
      user.posts.push(newPost._id)
      await user.save();
      console.log("post uploaded")
      res.send(newPost)
    } else {
      res.status(406).json({ msg: "content is required" })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

};


exports.getPostById = async (req, res) => {
  try {
    const post = await Post.find({ postedBy: req.params.id })
    if (!post) {

      return res.status(404).json({ msg: "post not found", post })
    }
    // if (post.postedBy.toString !== req.user._id.toString) {
    //   return res.status(401).json({ msg: "Unauthorized" })
    // }
    res.send(post)
  } catch (error) {
    console.log("err")
    res.status(404).send(error)
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found", post })
    }
    if (post.postedBy.toString !== req.user._id.toString) {
      return res.status(401).json({ msg: "Unauthorized" })
    }
    await post.remove();
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params._id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({ msg: "post deleted", post })
  } catch (error) {
    console.log("err")
    res.status(404).send(error)
  }
}