const express = require('express');
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;