const React = require('react');
const { useEffect, useState, useCallback } = require('react');
const axios = require('axios');
const Blog = require('./Blog');

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = useCallback(async () => {
    const res = await axios.get(`http://localhost:3000/api/blog/user/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest();
      setUser(data.user);
    };
    fetchData();
  }, [sendRequest]);
  console.log(user);
  return React.createElement('div', null,
    user && user.blogs && user.blogs.map((blog, index) => (
      React.createElement(Blog, { id: blog._id, key: index, isUser: true, title: blog.title, description: blog.description, imageURL: blog.image, userName: user.name })
    ))
  );
};

module.exports = UserBlogs;
