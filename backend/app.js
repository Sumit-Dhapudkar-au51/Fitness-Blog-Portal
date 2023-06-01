const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog-routes.js');
const router = require('./routes/user-routes.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);
mongoose
  .connect('mongodb+srv://skothale135:e9tJpONoEqow3KuH@blogapp.79vtgfb.mongodb.net/BlogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
    console.log('Connected to the database and listening on port 3000.');
  })
  .catch((err) => {
    console.log(err);
  });
