const express = require("express");
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs", adminAuth, createBlog);
router.put("/blogs/:id", adminAuth, updateBlog);
router.delete("/blogs/:id", adminAuth, deleteBlog);

module.exports = router;
