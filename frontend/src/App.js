
const Header = require("./components/Header");
const Blogs = require("./components/Blogs");
const UserBlogs = require("./components/UserBlogs");
const BlogDetail = require("./components/BlogDetail");
const AddBlog = require("./components/AddBlog");

const React = require("react");
const { useEffect } = require("react");
const { Route, Routes } = require("react-router-dom");
const Auth = require("./components/Auth");
const { useDispatch, useSelector } = require("react-redux");
const { authActions } = require("./store");

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("header", null, React.createElement(Header, null)),
    React.createElement(
      "main",
      null,
      React.createElement(
        Routes,
        null,
        !isLoggedIn ? (
          React.createElement(Route, {
            path: "/auth",
            element: React.createElement(Auth, null),
          })
        ) : (
          React.createElement(React.Fragment, null,
            React.createElement(Route, {
              path: "/blogs",
              element: React.createElement(Blogs, null),
            }),
            React.createElement(Route, {
              path: "/myBlogs",
              element: React.createElement(UserBlogs, null),
            }),
            React.createElement(Route, {
              path: "/myBlogs/:id",
              element: React.createElement(BlogDetail, null),
            }),
            React.createElement(Route, {
              path: "/blogs/add",
              element: React.createElement(AddBlog, null),
            }),
            " "
          )
        )
      )
    )
  );
}

module.exports = App;
