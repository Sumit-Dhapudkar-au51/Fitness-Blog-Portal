const { Button, InputLabel, TextField, Typography } = require('@mui/material');
const { Box } = require('@mui/system');
const axios = require('axios');
const React = require('react');
const { useState } = require('react');
const { useNavigate } = require('react-router-dom');

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "", description: "", image: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:3000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem('userId')
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"));
  };
  return (
    React.createElement("div", null,
      React.createElement("form", { onSubmit: handleSubmit, autoComplete: "off" },
        React.createElement(Box, { border: 3, borderColor: "green", borderRadius: 10, boxShadow: "10px 10px 20px #ccc", padding: 3, margin: "auto", marginTop: 3, display: 'flex', flexDirection: 'column', width: "80%" },
          React.createElement(Typography, { fontWeight: 'bold', padding: 3, color: "grey", variant: 'h2', textAlign: 'center' }, "Add Your Blog"),
          React.createElement(InputLabel, { sx: labelStyles }, "Title"),
          React.createElement(TextField, { name: 'title', onChange: handleChange, value: inputs.title, margin: 'normal', variant: 'outlined' }),
          React.createElement(InputLabel, { sx: labelStyles }, "Description"),
          React.createElement(TextField, { name: 'description', onChange: handleChange, value: inputs.description, margin: 'normal', variant: 'outlined' }),
          React.createElement(InputLabel, { sx: labelStyles }, "Image URL"),
          React.createElement(TextField, { name: 'imageURL', onChange: handleChange, value: inputs.imageURL, margin: 'normal', variant: 'outlined' }),
          React.createElement(Button, { sx: { mt: 2, borderRadius: 4 }, variant: 'contained', color: 'warning', type: 'submit' }, "Submit")
        )
      )
    )
  );
};

module.exports = AddBlog;
