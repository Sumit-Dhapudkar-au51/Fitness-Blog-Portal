const { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } = require('@mui/material');
const React = require('react');
const { default: EditIcon } = require('@mui/icons-material/Edit');
const { default: DeleteIcon } = require('@mui/icons-material/Delete');
const { useNavigate } = require('react-router-dom');
const axios = require('axios');

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3000/api/blog/${id}`).catch(err => console.log(err));
    const data = res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"));
  };
  console.log(title, isUser);
  return (
    React.createElement("div", null,
      React.createElement(Card, { sx: { width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px, 5px 10px #ccc", ":hover:": { boxShadow: "10px, 10px 20px #ccc" } } },
        isUser && (
          React.createElement(Box, { display: 'flex' },
            React.createElement(IconButton, { onClick: handleEdit, sx: { marginLeft: 'auto' } },
              React.createElement(EditIcon, { color: "primary" })
            ),
            React.createElement(IconButton, { onClick: handleDelete },
              React.createElement(DeleteIcon, { color: "error" })
            )
          )
        ),
        React.createElement(CardHeader, {
          avatar: React.createElement(Avatar, { sx: { bgcolor: "red" }, "aria-label": "recipe" },
            userName ? userName.charAt(0) : ""
          ),
          title: title
        }),
        React.createElement(CardMedia, {
          component: "img",
          height: "auto",
          image: imageURL,
          alt: "image is loading"
        }),
        React.createElement(CardContent, null,
          React.createElement("hr", null),
          React.createElement("br", null),
          React.createElement(Typography, { variant: "body2", color: "text.secondary" },
            React.createElement("b", null, userName),
            " : ",
            description
          )
        )
      )
    )
  );
};

module.exports = Blog;
