const { Button, TextField, Typography } = require('@mui/material');
const { Box } = require('@mui/system');
const React = require('react');
const { useState } = require('react');
const axios = require('axios');
const { useDispatch } = require('react-redux');
const { authActions } = require('../store');
const { useNavigate } = require('react-router-dom');

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "", email: "", password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:3000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispath(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data));
    }
    else {
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispath(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data));
    }
  };
  return (
    React.createElement("div", null,
      React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(Box, { maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "10px 10px 20px #ccc", padding: 3, margin: 'auto', marginTop: 5, borderRadius: 5 },
          React.createElement(Typography, { variant: "h3", padding: 3, textAlign: 'center' }, isSignup ? "Sign Up" : "Login"),
          isSignup && (React.createElement(TextField, { name: 'name', onChange: handleChange, value: inputs.name, placeholder: "Name", margin: 'normal' })),
          React.createElement(TextField, { name: 'email', onChange: handleChange, value: inputs.email, type: 'email', placeholder: 'Email', margin: 'normal' }),
          React.createElement(TextField, { name: 'password', onChange: handleChange, value: inputs.password, type: 'password', placeholder: 'Password', margin: 'normal' }),
          React.createElement(Button, { type: "sumbit", variant: "contained", sx: { borderRadius: 3, marginTop: 3 }, color: "warning" }, "Submit"),
          React.createElement(Button, { onClick: () => setIsSignup(!isSignup), sx: { borderRadius: 3, marginTop: 3 } }, "Change to ", isSignup ? "Login" : "Signup")
        )
      )
    )
  );
};

module.exports = Auth;
