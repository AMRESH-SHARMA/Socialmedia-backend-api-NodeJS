const express = require("express");
const {  createPost, deletePost, getPostById } = require('../controllers/post');
const { isAuthenticated } = require("../middlewares/auth");
const multer = require("multer");
const { multerStorage } = require('../utils/multer')
const upload = multer({
  storage: multerStorage,
});
const cpUpload = upload.single("imageAsset")
const router = express.Router();

router.route("/post/:id")
  .get( getPostById)

router.route("/post")
  .post(isAuthenticated, cpUpload, createPost);

router.route("/post/:id")
  .delete(isAuthenticated, deletePost)

module.exports = router;