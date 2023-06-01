const { Button, InputLabel, TextField, Typography } = require('@mui/material');
const { Box } = require('@mui/system');
const axios = require('axios');
const React = require('react');
const { useEffect, useState, useCallback } = require('react');
const { useNavigate, useParams } = require('react-router-dom');

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = useCallback(async () => {
    const res = await axios.get(`http://localhost:3000/api/blog/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetails();
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description
      });
    };
    fetchData();
  }, [fetchDetails]);

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:3000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate("/myBlogs/"));
  }
  return React.createElement('div', null,
    inputs && React.createElement('form', { onSubmit: handleSubmit },
      React.createElement(Box, { border: 3, borderColor: "green", borderRadius: 10, boxShadow: "10px 10px 20px #ccc", padding: 3, margin: "auto", marginTop: 3, display: "flex", flexDirection: "column", width: "80%" },
        React.createElement(Typography, { fontWeight: "bold", padding: 3, color: "grey", variant: "h2", textAlign: "center" }, "Edit Your Blog"),
        React.createElement(InputLabel, { sx: labelStyles }, "Title"),
        React.createElement(TextField, { name: "title", onChange: handleChange, value: inputs.title, margin: "normal", variant: "outlined" }),
        React.createElement(InputLabel, { sx: labelStyles }, "Description"),
        React.createElement(TextField, { name: "description", onChange: handleChange, value: inputs.description, margin: "normal", variant: "outlined" }),
        React.createElement(Button, { sx: { mt: 2, borderRadius: 4 }, variant: "contained", color: "warning", type: "submit" }, "Submit")
      )
    )
  );
};

module.exports = BlogDetail;

