const express = require("express");
const { readPost,createPost, likeUnlike, deletePost, updatePost, commentPost } = require('../controllers/post');
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post")
  .get(isAuthenticated,readPost)

router.route("/post/upload")
  .post(isAuthenticated,createPost);

router.route("/post/:id")
  .get(isAuthenticated,likeUnlike)
  .post(isAuthenticated,commentPost)
  .put(isAuthenticated,updatePost)
  .delete(isAuthenticated,deletePost)

module.exports = router;