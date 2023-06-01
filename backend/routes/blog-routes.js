const express = require('express');
const {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
} = require('../controllers/blog-controller');

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.get('/:id', getById);
blogRouter.delete('/:id', deleteBlog);
blogRouter.get('/user/:id', getByUserId);

module.exports = blogRouter;
