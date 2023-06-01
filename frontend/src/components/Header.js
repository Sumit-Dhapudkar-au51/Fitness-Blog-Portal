const React = require('react');
const { useState } = require('react');
const { AppBar, Button, Tab, Tabs, Toolbar, Typography } = require('@mui/material');
const { Box } = require('@mui/system');
const { Link } = require('react-router-dom');
const { useDispatch, useSelector } = require('react-redux');
const { authActions } = require('../store');

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  
  return React.createElement(AppBar, { position: 'sticky', sx: { background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(38,60,111,1) 35%, rgba(0,212,255,1) 100%);" } },
    React.createElement(Toolbar, null,
      React.createElement(Typography, { variant: 'h4' }, "Blog Portal"),
      isLoggedIn && React.createElement(Box, { display: 'flex', marginLeft: 'auto', marginRight: "auto" },
        React.createElement(Tabs, { textColor: "inherit", value: value, onChange: (e, val) => setValue(val) },
          React.createElement(Tab, { component: Link, to: "/blogs", label: "All Blogs" }),
          React.createElement(Tab, { component: Link, to: "/myBlogs", label: "My Blogs" }),
          React.createElement(Tab, { component: Link, to: "/blogs/add", label: "Add Blogs" })
        )
      ),
      React.createElement(Box, { display: "flex", marginLeft: 'auto' },
        !isLoggedIn && (
          React.createElement(React.Fragment, null,
            React.createElement(Button, { component: Link, to: "/auth", variant: 'contained', sx: { margin: 1, borderRadius: 10 }, color: 'warning' }, "Login"),
            React.createElement(Button, { component: Link, to: "/auth", variant: 'contained', sx: { margin: 1, borderRadius: 10 }, color: 'warning' }, "SignUp")
          )
        ),
        isLoggedIn && (
          React.createElement(Button, { onClick: () => dispatch(authActions.logout()), component: Link, to: "/auth", variant: 'contained', sx: { margin: 1, borderRadius: 10 }, color: 'warning' }, "Log Out")
        )
      )
    )
  );
};

module.exports = Header;

