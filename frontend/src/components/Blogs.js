const React = require('react');
const { useEffect, useState } = require('react');
const axios = require('axios');
const Blog = require('./Blog');

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:3000/api/blog").catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then(data=> setBlogs(data.blogs));
  },[]);
  console.log(blogs);
  return (
    React.createElement("div", null,
      blogs && blogs.map((blog, index) => (
        React.createElement(Blog, { id: blog._id, isUser: localStorage.getItem("userId") === blog.user._id,
          title: blog.title, description: blog.description, imageURL: blog.image, userName: blog.user.name })
      )) 
    )
  );
};

module.exports = Blogs;
