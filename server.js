const express = require('express')
const helmet = require('helmet')
// import routers 
const userRouter = require("./router/user-router.js")
const postsRouter = require("./router/posts-router.js")

const server = express();

server.use(express.json())
server.use(helmet());

server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res, next) => {
    res.send(`
      <h2>Welcome!</h2>
      `);
  });

module.exports = server;
